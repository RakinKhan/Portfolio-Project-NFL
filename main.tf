# terraform init: downloads and installs the providers specified in the configuration file
# a resource blocks declares a resource of a given type. within the block body are the configuration arguments of the resource itself

# Provider block
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}


# Configure the AWS Provider
provider "aws" {
  region     = "us-east-1"
  access_key = var.credentials.access_key
  secret_key = var.credentials.secret_key
}

# Create a VPC
resource "aws_vpc" "main_vpc" {
  cidr_block = "10.0.0.0/16"
  tags = {
    "Name" = "Main VPC"
  }
}

# Create a Public Subnet
resource "aws_subnet" "main_subnet" {
  vpc_id            = aws_vpc.main_vpc.id
  cidr_block        = "10.0.1.0/24"
  availability_zone = "us-east-1a"
  tags = {
    "Name" : "Public Subnet"
  }
}

# Create a Private Subnet
resource "aws_subnet" "private_subnet" {
  vpc_id            = aws_vpc.main_vpc.id
  cidr_block        = "10.0.2.0/24"
  availability_zone = "us-east-1b"
  tags = {
    "Name" : "Private Subnet"
  }
}

# Creates a Route Table 
resource "aws_default_route_table" "public_rt" {
  default_route_table_id = aws_vpc.main_vpc.default_route_table_id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.public_igw.id
  }
  tags = {
    Name = "Public Route Table"
  }
}

# Create a Route Table Association 
resource "aws_route_table_association" "public_RT_association" {
  subnet_id      = aws_subnet.main_subnet.id
  route_table_id = aws_default_route_table.public_rt.id
}

#Create an Internet Gateway
resource "aws_internet_gateway" "public_igw" {
  vpc_id = aws_vpc.main_vpc.id
  tags = {
    Name = "Main Public IGW"
  }
}

# Public EC2 Instance
resource "aws_instance" "public_instance" {
  ami                         = "ami-084568db4383264d4"
  instance_type               = "t2.micro"
  subnet_id                   = aws_subnet.main_subnet.id
  vpc_security_group_ids      = [aws_default_security_group.default_sg.id]
  associate_public_ip_address = true
  key_name                    = "rk-test"

  connection {
    type        = "ssh"
    host        = self.public_ip
    user        = "ubuntu"
    private_key = file("~/Downloads/rk-test.pem")
  }
  provisioner "file" {
    source      = "~/Downloads/rk-test.pem"
    destination = "/home/ubuntu/rk-test.pem"
  }
  tags = {
    Name = "Frontend Instance"
  }
}

# Private EC2 Instance
resource "aws_instance" "private_instance" {
  ami                         = "ami-084568db4383264d4"
  instance_type               = "t2.micro"
  subnet_id                   = aws_subnet.private_subnet.id
  vpc_security_group_ids      = [aws_security_group.private_security_group.id]
  key_name                    = "rk-test"
  associate_public_ip_address = false

  tags = {
    Name = "Server Instance"
  }
}

resource "aws_eip" "nat" {
  domain = "vpc"
}

resource "aws_nat_gateway" "public_subnet_nat" {
  allocation_id = aws_eip.nat.id
  subnet_id     = aws_subnet.main_subnet.id
  depends_on    = [aws_internet_gateway.public_igw]
  tags = {
    Name = "NAT Gateway"
  }
}

resource "aws_route_table" "private_subnet_rt_nat" {
  vpc_id = aws_vpc.main_vpc.id
  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.public_subnet_nat.id
  }
  tags = {
    Name = "NAT Route Table"
  }
}

resource "aws_route_table_association" "private_RT_association" {
  subnet_id      = aws_subnet.private_subnet.id
  route_table_id = aws_route_table.private_subnet_rt_nat.id
}
