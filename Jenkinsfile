pipeline {
    agent any

    environment {
        DOCKER_REGISTRY = 'https://registry.hub.docker.com/v2/'
        DOCKERHUB_CREDENTIALS = credentials('dockerhub')
        FRONTEND_IMAGE_NAME = 'my_frontend_image'
        BACKEND_IMAGE_NAME = 'my_backend_image'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build and Push Frontend Image') {
            steps {
                    script{
                    docker.withRegistry('https://registry.hub.docker.com/v2/', 'dockerhub') {

                    def customImage = docker.build("tadashi158/$FRONTEND_IMAGE_NAME:${env.BUILD_ID}", "-f ${env.WORKSPACE}/Dockerfile.frontend .")
                    customImage.push()
                    }
                }
            }
        }
        

        stage('Build and Push Backend Image') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com/v2/', 'dockerhub') {

                    def customImage = docker.build("tadashi158/$BACKEND_IMAGE_NAME:${env.BUILD_ID}", "-f ${env.WORKSPACE}/Dockerfile.backend .")
                    customImage.push()
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    bat 'docker-compose build'
                    bat 'docker-compose up'
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

