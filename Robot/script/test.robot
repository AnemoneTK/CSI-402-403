*** Settings ***
Documentation     test ci/cd
Library           SeleniumLibrary

*** Test Cases ***
TC Go to SPU
    Open Browser    http://localhost:3100    Chrome
    Sleep    3s
    Capture Page Screenshot    
