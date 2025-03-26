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

resource "aws_instance" "public_instance" {
  ami                         = "ami-08b5b3a93ed654d19"
  instance_type               = "t2.micro"
  subnet_id                   = aws_subnet.main_subnet.id
  vpc_security_group_ids      = [aws_default_security_group.default_sg.id]
  associate_public_ip_address = true
  key_name                    = "rk-test"
  tags = {
    Name = "Frontend Instance"
  }
}
