# 🚀 Cloud-Native DevSecOps Monitoring Pipeline

> **End-to-end observability platform** — containerized on AWS EC2 with real-time metrics, automated security scanning, and CI/CD integration.

![AWS EC2](https://img.shields.io/badge/AWS-EC2-FF9900?style=flat-square&logo=amazon-aws&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=flat-square&logo=docker&logoColor=white)
![Prometheus](https://img.shields.io/badge/Prometheus-Monitoring-E6522C?style=flat-square&logo=prometheus&logoColor=white)
![Grafana](https://img.shields.io/badge/Grafana-Dashboard-F46800?style=flat-square&logo=grafana&logoColor=white)
![Trivy](https://img.shields.io/badge/Trivy-Security-1904DA?style=flat-square&logo=aqua&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI%2FCD-2088FF?style=flat-square&logo=github-actions&logoColor=white)

---

## 📌 Problem Statement

Modern applications require not just deployment — they demand **continuous monitoring, security enforcement, and automation**. Traditional setups fail to deliver:

- No real-time visibility into system performance
- Security checks isolated from the deployment pipeline
- No centralized observability dashboard
- Disconnected CI/CD and monitoring workflows

This project solves all of the above in a single, integrated DevSecOps platform.

---

## 🎯 Project Objective

Build a **complete DevSecOps pipeline** that:

- Deploys a containerized application on AWS cloud infrastructure
- Monitors application performance metrics in real-time
- Visualizes CPU, memory, RPS, and GC metrics via dashboards
- Integrates vulnerability scanning directly into CI/CD
- Ensures scalability, observability, and reliability at every layer

---

## 🛠️ Tech Stack

| Category         | Tools                          |
|------------------|-------------------------------|
| Cloud            | AWS EC2                        |
| Containerization | Docker, Docker Compose         |
| Monitoring       | Prometheus                     |
| Visualization    | Grafana                        |
| CI/CD            | GitHub Actions                 |
| Security         | Trivy                          |
| Application      | Node.js                        |
| Version Control  | Git & GitHub                   |

---

## 🏗️ System Architecture

```
                    ┌─────────────────────────────────────┐
                    │           AWS EC2 Instance           │
                    │                                      │
  User Request ───► │  ┌──────────┐    ┌──────────────┐  │
                    │  │  Node.js │───►│  /metrics    │  │
                    │  │  App     │    │  endpoint    │  │
                    │  │  :4000   │    └──────┬───────┘  │
                    │  └──────────┘           │           │
                    │                         ▼           │
                    │                  ┌──────────────┐   │
                    │                  │  Prometheus  │   │
                    │                  │  Scraper     │   │
                    │                  │  :9090       │   │
                    │                  └──────┬───────┘   │
                    │                         │           │
                    │                         ▼           │
                    │                  ┌──────────────┐   │
                    │                  │   Grafana    │   │
                    │                  │  Dashboard   │   │
                    │                  │  :3000       │   │
                    │                  └──────────────┘   │
                    └─────────────────────────────────────┘

  ─────────────────────── CI/CD Flow ───────────────────────

  Git Push ──► GitHub Actions ──► Docker Build ──► Trivy Scan
                                                        │
                                         PASS ◄────────┤
                                           │            │
                                           ▼         FAIL → Pipeline Halts
                                     Deploy to EC2
```

---

## ⚙️ CI/CD Pipeline Flow

```
[1] Developer pushes code to GitHub
        │
        ▼
[2] GitHub Actions workflow triggered
        │
        ▼
[3] Application build starts
        │
        ▼
[4] Docker image created
        │
        ▼
[5] Trivy scans image for vulnerabilities
        │
    ┌───┴───┐
  PASS    FAIL
    │       │
    ▼       └──► Pipeline halts · Alerts raised
[6] Deploy updated app to EC2
        │
        ▼
[7] Prometheus confirms /metrics live
        │
        ▼
[8] Grafana dashboard reflects new deployment
```

---

## 🚀 Deployment Setup

Services are managed via **Docker Compose** on a single AWS EC2 instance:

```yaml
services:
  app:         # Node.js Application    → Port 4000
  prometheus:  # Metrics Scraper        → Port 9090
  grafana:     # Visualization Layer    → Port 3000
```

All services run on an **isolated Docker network** for secure inter-service communication. Grafana data is persisted via a **Docker volume** to survive container restarts.

---

## 📊 Monitoring & Observability

Prometheus scrapes the application's `/metrics` endpoint and feeds data into Grafana. Metrics tracked in real-time:

- **CPU Usage** — system and process-level
- **Memory Usage** — heap and RSS
- **Requests Per Second (RPS)** — live traffic rate
- **GC Metrics** — Node.js garbage collection events
- **Application Health** — uptime and availability

---

## 🔐 Security Practices

- **Trivy** integrated into CI/CD — blocks deployment on critical CVEs
- Isolated Docker network — services communicate internally only
- No hardcoded credentials or secrets in source code
- Container best practices followed throughout
- Application health continuously monitored via Prometheus

---

## ⚔️ Challenges & Solutions

| Issue | Root Cause | Fix Applied |
|-------|-----------|-------------|
| Prometheus showing "No Data" | Service discovery misconfiguration in Docker | Configured correct service name and network in `prometheus.yml` |
| Port already allocated error | Existing container occupying same port | Identified and removed conflicting container |
| Grafana data loss on restart | No persistent storage configured | Added Docker volume for Grafana persistence |
| `docker-compose` command not found | Compose plugin not installed | Installed plugin / switched to `docker compose` v2 syntax |

---

## 📈 Results

- ✅ Real-time Grafana monitoring dashboard deployed and live
- ✅ Full observability stack — CPU, Memory, RPS, GC metrics visible
- ✅ Automated CI/CD pipeline with security gate (Trivy)
- ✅ Production-grade containerized deployment on AWS EC2
- ✅ Hands-on experience with a real-world DevSecOps toolchain

---

## 🔮 Future Roadmap

- [ ] Add **Kubernetes (EKS)** for container orchestration and auto-scaling
- [ ] Implement **Prometheus Alertmanager** for incident alerting
- [ ] Integrate **ELK Stack / Loki** for centralized log aggregation
- [ ] Add **auto-scaling and load balancing** via AWS ALB
- [ ] Enhance security pipeline with **SAST/DAST** tools

---

## 📁 Project Structure
 
```
cloud-native-devsecops-pipeline/
│
├── .github/                        # GitHub Actions CI/CD workflows
│   └── workflows/
│       └── deploy.yml              # Pipeline: build → scan → deploy
│
├── app/                            # Node.js application
│   ├── index.js                    # App entry point with /metrics endpoint
│   ├── package.json                # Dependencies
│   └── Dockerfile                  # Container image definition
│
├── terraform/                      # Infrastructure as Code
│   ├── main.tf                     # EC2 instance + security groups
│   ├── variables.tf                # Input variables
│   └── outputs.tf                  # Output values (public IP, etc.)
│
├── prometheus.yml                  # Prometheus scrape config
├── docker-compose.yml              # Multi-service orchestration
├── .gitignore
└── README.md
```
 
---

## 🧑‍💻 Author

**Midhun**
Security Analyst → DevOps & Cloud Engineer

[![LinkedIn](https://img.shields.io/badge/LinkedIn-midhun--cloud-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://linkedin.com/in/midhun-cloud)
[![GitHub](https://img.shields.io/badge/GitHub-Midhun--Git--Dev-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/Midhun-Git-Dev)

---

> *This project demonstrates a real-world DevSecOps pipeline combining deployment, monitoring, security, and automation — built to reflect industry-level practices.*
