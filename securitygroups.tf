resource "aws_default_security_group" "default_sg" {
  vpc_id = aws_vpc.main_vpc.id
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  tags = {
    Name = "default security group"
  }
}
resource "aws_security_group" "private_security_group" {
  vpc_id = aws_vpc.main_vpc.id

  ingress {
    from_port = 0
    to_port   = 0
    protocol  = "-1"
    # Allows traffic from Public Subnet to Private Subnet
    security_groups = [aws_default_security_group.default_sg.id]
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  tags = {
    Name = "Private Subnet Security Group"
  }
}
