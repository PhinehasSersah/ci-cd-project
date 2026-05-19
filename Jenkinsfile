pipeline {
    agent any

    environment {
        IMAGE_NAME = 'ci-cd-project'
        IMAGE_TAG  = "${BUILD_NUMBER}"
    }

    stages {
        stage('Install') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build Image') {
            steps {
                sh 'docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .'
            }
        }

        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                sh '''
                    docker stop ci-cd-app || true
                    docker rm   ci-cd-app || true
                    docker run -d --name ci-cd-app -p 3000:3000 ${IMAGE_NAME}:${IMAGE_TAG}
                '''
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        failure {
            echo 'Pipeline failed — check the logs above.'
        }
    }
}
