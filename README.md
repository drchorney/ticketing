// kubernetes creating secret
k create secret generic stripe-secret --from-literal STRIPE_KEY=
// list secrets
k get secrets


// Digital Ocean
// intialize doctl
doctl auth init

// get connection info for our new cluster
doctl kubernetes cluster kubeconfig save ticketing

// list all contexts
k config view

// switch to minikube
k config use-context minikube

// configuring nginx on digital ocean - https://kubernetes.github.io/ingress-nginx/deploy/#digital-ocean
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.45.0/deploy/static/provider/do/deploy.yaml
