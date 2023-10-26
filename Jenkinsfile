pipeline {
  agent any
  tools { nodejs "node" }
  environment {
    GH_TOKEN = credentials('jenkins-pat')
  }
  stages {
    stage('Clone repository') {
      when {
        branch 'master'
      }
      steps {
        cleanWs()
        checkout scm
      }
    }
    stage('Build Image') {
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
    stage('Release with semantic-release') {
      when {
        branch 'master'
      }
      steps {
        sh '''
        npm install @semantic-release/commit-analyzer
        npm install @semantic-release/release-notes-generator
        npm install @semantic-release/changelog
        npm install semantic-release-helm
        npm install @semantic-release/git
        npm install @semantic-release/github
        npx semantic-release
        '''
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
