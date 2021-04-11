// kubernetes creating secret
k create secret generic stripe-secret --from-literal STRIPE_KEY=
// list secrets
k get secrets
