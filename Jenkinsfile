pipeline {
    agent any

    environment {
        DOCKER_REGISTRY = 'https://index.docker.io/v1/'
        DOCKERHUB_CREDENTIALS = credentials('dockerhub')
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
                    docker.build("tadashi158/$FRONTEND_IMAGE_NAME:${env.BUILD_ID}", "-f ${env.WORKSPACE}/Dockerfile.frontend .")
                    // sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
                    // sh 'docker push tadashi158/your_frontend_image:$BUILD_NUMBER'
                    // withCredentials([usernamePassword(credentialsId: DOCKER_CREDENTIALS, usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                    //     sh "echo ${PASSWORD} | docker login -u ${USERNAME} --password-stdin ${DOCKER_REGISTRY}"
                    //     docker.withRegistry(DOCKER_REGISTRY, DOCKER_CREDENTIALS) {
                    //         docker.image(FRONTEND_IMAGE_NAME).push()
                    //     }
                    // }

                }
            }
        }

    //     stage('Login') {
    //     steps {
      //   sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
    //         withCredentials([usernamePassword(credentialsId: DOCKERHUB_CREDENTIALS, usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
    //         sh "echo ${PASSWORD} | docker login -u ${USERNAME} --password-stdin ${DOCKER_REGISTRY}"
    //     }
    //   }
    //     }
            stage('Login') {
                steps {
                    withCredentials([usernamePassword(credentialsId: 'DOCKERHUB_CREDENTIALS', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                        sh "docker login -u ${USERNAME} -p ${PASSWORD} ${DOCKER_REGISTRY}"
                    }
                }
            }


      stage('Push') {
        steps {
          sh 'docker push tadashi158/your_frontend_image:$BUILD_NUMBER'
        }
      }


        // stage('Build and Push Backend Image') {
        //     steps {
        //         script {
        //             docker.build(BACKEND_IMAGE_NAME, "-f Dockerfile.backend .")
        //             withCredentials([usernamePassword(credentialsId: DOCKER_CREDENTIALS, usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
        //                 sh "echo ${PASSWORD} | docker login -u ${USERNAME} --password-stdin ${DOCKER_REGISTRY}"
        //                 docker.withRegistry(DOCKER_REGISTRY, DOCKER_CREDENTIALS) {
        //                     docker.image(BACKEND_IMAGE_NAME).push()
        //                 }
        //             }
        //         }
        //     }
        // }

//         stage('Deploy') {
//             steps {
//                 script {
//                     dockerComposeBuild()
//                     dockerComposeUp()
//                 }
//             }
//         }
//     }

//     post {
//         always {
//             script {
//                 dockerComposeDown()
//             }
//         }
//     }
}
}

