pipeline {
  agent any
  stages {
    stage('Clone repository') {
      agent any
      when {
        branch 'master'
      }
      steps {
        checkout scm
      }
    }
    stage('Build Image') {
      agent any
      when {
        branch 'master'
      }
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerHub', usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')]) {
          sh 'docker build --no-cache -t $DOCKERHUB_USERNAME/webapp:latest -f Dockerfile .'
        }
      }
    }
    stage('Push Image') {
      agent any
      when {
        branch 'master'
      }
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerHub', passwordVariable: 'DOCKERHUB_PASSWORD', usernameVariable: 'DOCKERHUB_USERNAME')]) {
          sh 'docker login -u $DOCKERHUB_USERNAME -p $DOCKERHUB_PASSWORD'
          sh 'docker image push --all-tags $DOCKERHUB_USERNAME/webapp'
        }
      }
    }
  }
  post {
    always {
      sh 'docker logout'
      sh 'docker system prune -a -f'
    }
  }
}
