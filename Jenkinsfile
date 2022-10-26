pipeline {
  agent {
    node {
      label 'node'
    }

  }
  stages {
    stage('clone') {
      steps {
        git(url: 'https://github.com/fedapon/nestjs-typescript-challenge.git', branch: 'main')
        sh 'npm install'
      }
    }

    stage('unit test') {
      steps {
        sh 'npm run test'
      }
    }

    stage('e2e test') {
      steps {
        sh 'npm run test:e2e'
      }
    }

    stage('build') {
      steps {
        sh 'npm run build'
      }
    }

  }
  environment {
    JWT_SECRET = 'secretKey'
  }
}