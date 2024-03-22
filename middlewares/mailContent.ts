interface project{
    link: string,
    name: string,
    reason: string
}
export async function contentSelector(purpose:string, userName: string, project:project) {
    let purposeObj = {title:"", purp:"", content:""}
    const accept = {
        title: `${userName}님께서 지원하신 ${project.name}의 결과를 알려드립니다.`,
        purp: '프로젝트 지원 결과 안내',
        content:`<p>${project.name} 지원에 대해 감사드립니다. ${userName}님은 프로젝트의 신규 멤버로 선발되셨습니다.</p>
        <p>해당 프로젝트는 <a href=${project.link}>이 링크</a>를 통해 다시 확인하실 수 있습니다.</p>`
    }
    const decline={
        title: `${userName}님께서 지원하신 ${project.name}의 결과를 알려드립니다.`,
        purp: '프로젝트 지원 결과 안내',
        content:`<p>${project.name} 지원에 대해 감사드립니다. ${userName}님은 프로젝트의 신규 멤버로 선발되셨습니다.</p>
        <p>해당 프로젝트는 <a href=${project.link}>이 링크</a>를 통해 다시 확인하실 수 있습니다.</p>`
    }
    
    const deletion={
        title: `${userName}님께서 지원하신 ${project.name}이 삭제되었습니다.`,
        purp: '프로젝트 삭제 안내',
        content: `<p>${project.name} 지원에 대해 감사드립니다. 해당 프로젝트는 ${project.reason}의 사유로 삭제되었습니다.`
    }
    
    const edit={
        title: `${userName}님께서 지원하신 ${project.name}이 수정되었습니다.`,
        purp: '프로젝트 수정 안내',
        content: `<p>${project.name} 지원에 대해 감사드리며 내용 수정이 발생했음을 알려드립니다. 
        <p>해당 프로젝트는 <a href=${project.link}>이 링크</a>를 통해 다시 확인하실 수 있습니다.</p>`
    }
    
    if (purpose=='accept'){
        purposeObj=accept
    }
    else if (purpose =="decline"){
        purposeObj=decline
    }
    else if (purpose== "deletion"){
        purposeObj=deletion
    }
    else if (purpose =='edit'){
        purposeObj=edit
    }
    const contentHTML= `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${purposeObj.title}</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
            }
            img {
                max-width: 100%;
                height: auto;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <img src="../IMG_3881.jpeg" alt="로고">
            <h2>${purposeObj.purp}</h2>
            <p>안녕하세요,</p>
            ${purposeObj.content}
            <p>감사합니다.</p>
        </div>
    </body>
    </html>
    `
    return {subject:purposeObj.title, html:contentHTML}
}
