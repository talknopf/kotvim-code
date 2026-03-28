# Wildcard DNS for PR preview environments
# *.kotvim-code.luposec.io -> kotvim-code.luposec.io (CNAME)
# This chains through the existing apex ALIAS -> NLB record,
# so pr-{N}.kotvim-code.luposec.io resolves to the ingress LB.

variable "domain" {
  description = "Base domain for the application"
  type        = string
  default     = "kotvim-code.luposec.io"
}

data "aws_route53_zone" "main" {
  name = "${var.domain}."
}

resource "aws_route53_record" "wildcard" {
  zone_id = data.aws_route53_zone.main.zone_id
  name    = "*.${var.domain}"
  type    = "CNAME"
  ttl     = 300
  records = [var.domain]
}

output "wildcard_dns_record" {
  description = "Wildcard DNS record for preview environments"
  value       = aws_route53_record.wildcard.fqdn
}

output "route53_zone_id" {
  description = "Route 53 hosted zone ID"
  value       = data.aws_route53_zone.main.zone_id
}
