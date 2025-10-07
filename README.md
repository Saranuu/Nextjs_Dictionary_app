

## 1. Setup Instructions

### Prerequisites
Ensure the following tools are installed on your system:

- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/) 
- [Docker](https://www.docker.com/)
- [Kubectl](https://kubernetes.io/docs/tasks/tools/)
- [Minikube](https://minikube.sigs.k8s.io/docs/start/)

## 2. Local run commands

```bash
git clone https://github.com/saranuu/nextjs_dictionary_app.git
cd nextjs_dictionary_app
```

### run the Dockerfile
```bash
Docker run -dt -p 3000 ghcr.io/saranuu/nextjs_dictionary_app:latest
```

### test in browser
<publicip>:3000


## 3. Deployment steps for minikube

To start Minikube cluster
```bash
minikube start
```

navigate to k8s directory
```bash
cd /k8s
```

Deploy the app in cluster
```bash
kubectl apply -f deployment.yaml
```

Expose the app by running servive.yaml
```bash
kubectl apply -f service.yaml
```

## 4. Access the deployed application
Go to a browser and access the application
{public-ip}:3000


