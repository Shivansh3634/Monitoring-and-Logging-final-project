#!/bin/bash
helm repo add signoz https://charts.signoz.io
helm repo update
helm install my-k8s-infra signoz/k8s-infra -f values.yaml
