pipeline {
    agent any
    environment {
        // ระบุ path ของไฟล์ docker-compose.yml
        DOCKER_COMPOSE_FILE = "docker-compose.yml"
        COMPOSE_BAKE = 'true'
        ROBOT_TESTS_DIR = "Robot/script"
        ROBOT_RESULTS_DIR = "Robot/result"
    }

    stages {
        stage('Clone Repository') {
            steps{
                echo "Cloning repository..."
                checkout([
                    $class : 'GitSCM',
                    branches : [[name : '*/main']],
                    userRemoteConfigs :[[
                        credentialsId: '76fb8aa3-686a-47ae-863a-772e8e12c160',
                        url: 'https://github.com/AnemoneTK/CSI-402-403.git'
                    ]]
                ])
                echo "Clone Success"
            }
        }

        stage('Check Docker Version') {
            steps {
                script {
                    echo "Checking Docker version..."
                    // เพิ่ม path สำหรับ Docker ที่ติดตั้งผ่าน Homebrew
                    sh '''
                        export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
                        docker --version
                        docker-compose --version
                        docker compose --version
                    '''
                }
            }
        }

        stage('Clean Docker') {
            steps {
                script {
                    sh """
                        export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
                        docker system prune -af --volumes
                    """
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    echo "Current directory: ${pwd()}"
                    echo "Listing files:"
                    sh 'ls -l'
                    echo "Building Docker image..."
                    sh """
                        export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
                        docker-compose -f $DOCKER_COMPOSE_FILE build --no-cache
                    """
                    echo "Docker image build complete."
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sh """
                        export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
                        docker-compose -f $DOCKER_COMPOSE_FILE up -d
                    """
                }
            }
        }
        stage('Robot Test') {
            steps {
                script {
                    echo "Running Robot Framework tests..."
                    // รัน Robot Framework โดยตรงบนเครื่อง Jenkins
                    sh """
                        /opt/anaconda3/bin/robot --outputdir ${pwd()}/Robot/result ${pwd()}/Robot/script
                    """
                }
            }
            post {
                always {
                    // จัดเก็บผลการทดสอบเป็น artifacts
                    archiveArtifacts artifacts: "${ROBOT_RESULTS_DIR}/**/*", fingerprint: true
                    
                    robot outputPath: "${ROBOT_RESULTS_DIR}", 
                        passThreshold: 80.0, 
                        unstableThreshold: 60.0
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished!'
        }
        success {
            echo 'Build and deploy completed successfully!'
        }
        failure {
            echo 'Build or deploy failed!'
        }
    }
}
