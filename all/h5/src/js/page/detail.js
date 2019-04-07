define(['mui'], function(mui) {
    const content = document.querySelector('.content')
    const page = document.querySelector('.page');
    const sum = document.querySelector('.sum');
    const first = document.querySelector('.first');
    const last = document.querySelector('.last');
    let pages = 1;
    let index = 0;
    let total;

    function init() {
        getdata('哈密瓜', 1, 1);

    }

    function getdata(name, s, l) {
        mui.ajax('/getdata', {
            data: {
                name: name,
                skip: s,
                limit: l
            },
            success(rs) {
                const data = rs.data;
                total = rs.total;
                render(data)
                pagation(rs)
                sum.innerHTML = `共${rs.total}页`
            }
        })
    }

    function pagation(rs) {
        if (page.innerHTML === '') {
            var html = '';
            for (var i = 0; i < rs.total; i++) {

                if (i === 0) {
                    html += `<span class='on' data-id='${i}'>${i+1}</span>`
                } else {
                    html += `<span data-id='${i}'>${i+1}</span>`
                }
            }
            page.innerHTML += html;
            bind()
        }
    }

    function render(data) {
        content.innerHTML = data.map(function(item) {
            return `<p>${item.use}</p>`
        }).join('')

    }

    function bind() {
        const pagespan = document.querySelectorAll('.page>span')
        page.addEventListener('click', function(e) {
            const tar = e.target;
            if (tar.nodeName === 'SPAN') {
                pagespan[index].classList.remove('on')
                tar.classList.add('on');
                index = tar.getAttribute('data-id');
                pages = tar.innerHTML;
                getdata('哈密瓜', pages, 1)
            }
        })
        first.addEventListener('click', function() {
            getdata('哈密瓜', 1, 1)
        })
        last.addEventListener('click', function() {
            getdata('哈密瓜', total, 1)
        })

    }
    init()
});