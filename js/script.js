var bookmarkName = document.querySelector('#bookmarkName'),
    bookmarkURL = document.querySelector('#bookmarkURL'),
    submitBtn = document.querySelector('#submitBtn'),
    tableContent = document.querySelector('#tableContent'),
    validationMessage = document.querySelector('#validation')

bookmarks = []
if(localStorage.getItem('bookmarksList') != null){
    bookmarks = JSON.parse(localStorage.getItem('bookmarksList'))
    display()
    visitBtn()
}
// -----------display Url function-------------
function display(){
    trs = ''
    for(var i=0; i<bookmarks.length; i++){
        trs += `
        <tr>
            <td>${i + 1}</td>
            <td>${bookmarks[i].name}</td>              
            <td>
            <button class="btn btn-visit visitBtn" idx-data ='${i}'>
                <i class="fa-solid fa-eye pe-2"></i>
                Visit
            </button>
            </td>
            <td>
            <button class="btn btn-delete pe-2" onClick='deleteUrl(${i})'>
                <i class="fa-solid fa-trash-can"></i>
                Delete
            </button>
            </td>
        </tr>`
    }
    tableContent.innerHTML = trs
}
// -----------delete Url function-------------
function deleteUrl(param){
    bookmarks.splice(param, 1)
    localStorage.setItem('bookmarksList', JSON.stringify(bookmarks))
    display()
}
// -----------visit function-------------
function visitBtn(){
    var visitBtn = document.querySelectorAll('.visitBtn')
    var arrvisitBtn = Array.from(visitBtn)
    for(var i=0; i<arrvisitBtn.length; i++){
        arrvisitBtn[i].addEventListener('click',function(e){
            // for(var h=0; h<bookmarks.length; h++){
            var indxVisitBtn = e.target.getAttribute('idx-data')
            window.open (`${bookmarks[indxVisitBtn].url}`)
        })
    }
}
// -----------clear Inputs function-------------
function clearInputs(){
    bookmarkName.value = ''
    bookmarkURL.value = ''
}
// -----------submit Inputs function-------------
submitBtn.addEventListener('click', function createUrl(){
    // when submit show validate message
if(bookmarkName.value.match(/^[a-zA-Z]{3,}$/ig) == null || bookmarkURL.value.match(/^((https:\/\/|http:\/\/)(www\.)([a-z]{1,}|[0-9])\.([a-z]{1,3}))$/ig) == null){
    validationMessage.classList.replace('hidden-massege','show-massege')
}else{
    validationMessage.classList.replace('show-massege','hidden-massege')
    bookmarkInfo = {
        name:bookmarkName.value,
        url:bookmarkURL.value,
    }
    bookmarks.push(bookmarkInfo)
    localStorage.setItem('bookmarksList', JSON.stringify(bookmarks))
    display()
    visitBtn()
    clearInputs()
}
})
/*---------------------------------------------------------- VALIDATION ----------------------------------------------------------*/
document.querySelector('.close-message').addEventListener('click', function(){
    validationMessage.classList.replace('show-massege','hidden-massege')
})
/*--------------------------keyup VALIDATION --------------------------*/
bookmarkName.addEventListener('keyup', function(){
    if(bookmarkName.value.match(/^[a-zA-Z]{3,}$/ig) == null){
        bookmarkName.classList.add('is-invalid')
    }else{
        bookmarkName.classList.replace('is-invalid','is-valid')
    }
})
bookmarkURL.addEventListener('keyup', function(){
    if( bookmarkURL.value.match(/^((https:\/\/|http:\/\/)(www\.)([a-z]{1,}|[0-9])\.([a-z]{1,3}))$/ig) == null){
        bookmarkURL.classList.add('is-invalid')
    }else{
        bookmarkURL.classList.replace('is-invalid','is-valid')
    }
})
/*--------------------------paste VALIDATION --------------------------*/
bookmarkName.addEventListener('paste', function(){
    if(bookmarkName.value.match(/^[a-zA-Z]{3,}$/ig) == null){
        bookmarkName.classList.add('is-invalid')
    }else{
        bookmarkName.classList.replace('is-invalid','is-valid')
    }
})
bookmarkURL.addEventListener('paste', function(){
    if( bookmarkURL.value.match(/^((https:\/\/|http:\/\/)(www\.)([a-z]{1,}|[0-9])\.([a-z]{1,3}))$/ig) == null){
        bookmarkURL.classList.add('is-invalid')
    }else{
        bookmarkURL.classList.replace('is-invalid','is-valid')
    }
})