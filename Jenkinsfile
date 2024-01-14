pipeline {
    agent any

    environment {
        DOCKER_REGISTRY = 'https://registry.hub.docker.com'
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
                    sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
                    sh 'docker push tadashi158/your_frontend_image:$BUILD_NUMBER'
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
    //       sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
    //     }
    //   }

    //   stage('Push') {
    //     steps {
    //       sh 'docker push helloaryang/ssnui:$BUILD_NUMBER'
    //       sh 'docker push helloaryang/ssnserver:$BUILD_NUMBER'
    //       sh ' helloaryang/postgisserver:$BUILD_NUMBER'
    //     }
    //   }


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
