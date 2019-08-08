window.onload = function () {
    userInfo()
    comment()
}
function comment () {
    const color = ['#ffac00', '#b40b0b', '#ff4c94', '#f11010', '#ff9d71']
    let info = [1,2,3,5,2,1,2,3,5,2]
    info.forEach(item => {
        document.getElementById('comment_item').innerHTML += '<div><span class="portrait" style="background:'+ color[Math.floor(Math.random() * 5) ] +';color:#fff">T</span>' +
        '<div>' +
            ' <a href="http://">name</a>' +
            '<p>.contentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontent </p>' +
            '<div class="reply">' +
                '<span>create_date</span>' +
                ' <i class="iconfont iconliuyan" onclick="reply(event)">&nbsp; 回复 &nbsp;</i>' +
            '</div>'+
        '</div>'+
    '</div>'
    })
}
function commentsubmit() {
    var data = document.getElementById("comments").elements
    var reg = {
        email: new RegExp(/^.+@.+\..+$/),
        website: new RegExp(/^(http|https|ftp)\:\/\/.+$/)
    }
    var formdata = {}
    for (const i of data) {
        if (i.required&&!i.value) {
            alert("该填的没填完")
            return
        } else {
            if (i.dataset.reg) {
                if (new RegExp(i.dataset.reg).test(i.value)) formdata[i.name] = i.value
                else {
                    alert(`${i.name} 效验未通过`)
                    return
                }
            }  else formdata[i.name] = i.value 
        }
    }
    console.log(formdata)
}
function forgetMe() {
    localStorage.removeItem('userInfo')
}
function rememberMe() {
    var data = document.getElementById("comments").elements
    let info = {}
    for (const i of data) info[i.name] = i.value
    localStorage.setItem('userInfo', JSON.stringify(info))
}
function userInfo() {
    if (localStorage.getItem('userInfo')) {
        document.getElementById("personal").checked = true
        let info = JSON.parse(localStorage.getItem('userInfo'))
        const data = document.getElementById("comments").elements
        for (const i of data) i.value = info[i.name]
    }
}
