# Elastic IP for NAT Gateway
resource "aws_eip" "nat" {
  domain = "vpc"
}

# NAT Gateway for Public Subnet
resource "aws_nat_gateway" "public_subnet_nat" {
  allocation_id = aws_eip.nat.id
  subnet_id     = aws_subnet.main_subnet.id
  depends_on    = [aws_internet_gateway.public_igw]
  tags = {
    Name = "NAT Gateway"
  }
}

# Nat Gateway Route Table
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

# RT Association between NAT Gateway and Private Subnet
resource "aws_route_table_association" "private_RT_association" {
  subnet_id      = aws_subnet.private_subnet.id
  route_table_id = aws_route_table.private_subnet_rt_nat.id
}
