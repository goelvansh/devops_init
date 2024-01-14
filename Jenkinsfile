pipeline {
    agent any

    environment {
        DOCKER_REGISTRY = 'https://registry.hub.docker.com'
        DOCKER_CREDENTIALS = 'credentials-id'
        FRONTEND_IMAGE_NAME = 'your_frontend_image'
        BACKEND_IMAGE_NAME = 'your_backend_image'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build and Push Frontend Image') {
            steps {
                script {
                    docker.build(FRONTEND_IMAGE_NAME, "-f Dockerfile.frontend .")
                    withCredentials([usernamePassword(credentialsId: DOCKER_CREDENTIALS, usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                        sh "echo ${PASSWORD} | docker login -u ${USERNAME} --password-stdin ${DOCKER_REGISTRY}"
                        docker.withRegistry(DOCKER_REGISTRY, DOCKER_CREDENTIALS) {
                            docker.image(FRONTEND_IMAGE_NAME).push()
                        }
                    }
                }
            }
        }

        stage('Build and Push Backend Image') {
            steps {
                script {
                    docker.build(BACKEND_IMAGE_NAME, "-f Dockerfile.backend .")
                    withCredentials([usernamePassword(credentialsId: DOCKER_CREDENTIALS, usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                        sh "echo ${PASSWORD} | docker login -u ${USERNAME} --password-stdin ${DOCKER_REGISTRY}"
                        docker.withRegistry(DOCKER_REGISTRY, DOCKER_CREDENTIALS) {
                            docker.image(BACKEND_IMAGE_NAME).push()
                        }
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
