*For pushing code in docker hub, you have to login and you will get crenditals error. For this go to ~/.docker and in config.json, remove thrird line.
*I was not able to run docker and minikube in virtualbox parallel. so, I used kvm2 to run minikube.


************* INSTALLATION ************* (Lec-160)
1> Make sure docker should be installed in local.
2> Install kubectl -> This is Kubernetes command-line tool, that allows you to run commands against Kubernetes clusters.
3> Install minikube -> Minikube is a tool that provides an easy means of creating a local Kubernetes environment on any Linux, Mac, or Windows system, where you can experiment with and test Kubernetes deployments.

************* BASICS OF Kubernetes ************* (Lec-161)
-> Kubernetes works with Objects(pods, deployments, services, volume, ...)
-> Objects can either be created Imperatively or Declaratively.
-> Pod is smallest unit of Kubernetes which contains and run one or multiple containers.
-> For Pods to be managed for you, you need a "Controller" (e.g. a "Deployment")

************* THE DEPLOYMENT OBJECT ************* (Lec-162)
-> It controls one or multiple pods
-> We can set a desired state, Kubernetes then changes the actual state.
-> It defines which pods and containers to run and the number of instances.
-> Deployments can be paused, deleted and rolled back.
-> Deployments can be scaled dynamically(and automatically).
-> We can change the number of desired Pods as needed.
-> Deployments manage a Pod for us, we can also create multiple Deployments.

************* CREATING FIRST CLUSTER / deployment (using Imperatively mode) ************* (lec-163)
-> Create normal express server
-> Create Dockerfile
-> Make sure docker is running and minikube is running(To check status type "minikube status" and to start type "minikube start --driver=kvm2" and "minikube stop" and "minikube delete")
-> To create cluster first push code to docker-hub and use that image in kubectl
-> command  =  kubectl create deployment first-app --image=rebooters/kub-first-app
-> kubectl get deployments, kubectl get pods
-> Now run "minikube dashboard" to open ui of Kubernetes in browser. Here, we see one deployment and one pod is running.

************* CREATING SERVICE OBJECT ************* (lec-165)
-> Exposes Pods to the cluster or externally
-> Pods have internal IP by default and it changes when pod is replaced. So, services group Pods with a shared IP.
-> Services can allow external access to pods, by default it is internal only.
-> Without services, Pods are very hard to reach and communication is difficult.
-> Reaching a Pod from outside the cluster is not possible at all without Services.
<== COMMANDS ==>
-> kubectl expose deployment first-app --type=LoadBalancer --port=8000 
-> Check services using "kubectl get services"
-> Now run "minikube service first-app", this will run backend and open this in browser.

***************** REPLICAS **************** (Lec-168)
-> A replica is simply an instance of a Pod/Container. Like 3 replicas means the same Pod/Container is running three times.
-> kubectl scale deployment/first-app --replicas=3 (This will run same pod three times with different pod name and used as load balancing.)
-> There is error route in the code, run that here replicas helps, if one is crash other two is running and so on.

***************** AUTO UPDATE CODE COMMANDS ****************(Till Lec-170)
-> first build new image and tag must be added (docker build -t rebooters/kub-first-app:3 .)
-> now push this to docker hub (docker push rebooters/kub-first-app:3)
-> kubectl set image deployment/first-app kub-first-app=rebooters/kub-first-app:3 (This will update the code)
-> To check status run (kubectl rollout status deployment/first-app)
<== IMPORTANT ==>
-> Let we did some error in image or tag name while kubectl set...
-> Then run command (kubectl rollout undo deployment/first-app) , this will rollout to the previous update.
-> To check deployment history run (kubectl rollout history deployment/first-app)
-> For more details of history run (kubectl rollout history deployment/first-app --revision=<REVISION_NUMBER>)
-> To directly go to specified deployment run (kubectl rollout undo deployment/first-app --to-revision=<REVISION_NUMBER>)


**************** AFTER ALL TESTING RUN FOLLOWING COMMANDS ***************
-> kubectl delete services first-app
-> kubectl delete deployment first-app
-> Recheck no services, pods and deployments are there by command "kubectl get <name>"
-> minikube stop and then minikube delete