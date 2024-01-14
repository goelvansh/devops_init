pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build and Push Frontend Image') {
            steps {
                script {
                    docker.build("frontend-image", "-f Dockerfile.frontend .")
                    docker.withRegistry('https://hub.docker.com', 'credentials-id') {
                        docker.image("frontend-image").push()
                    }
                }
            }
        }

        stage('Build and Push Backend Image') {
            steps {
                script {
                    docker.build("backend-image", "-f Dockerfile.backend .")
                    docker.withRegistry('https://hub.docker.com', 'credentials-id') {
                        docker.image("backend-image").push()
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    dockerComposeBuild()
                    dockerComposeUp()
                }
            }
        }
    }

    post {
        always {
            script {
                dockerComposeDown()
            }
        }
    }
}
