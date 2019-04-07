define(['mui', "BScroll"], function(mui, BScroll) {

    var [a, b] = [
        [],
        []
    ]
    var page = 1;
    var pulldown = document.querySelector('.pulldown')
    var flag = false;
    const BS = new BScroll('.mainbody', {
        probeType: 2
    })
    const box = [...document.querySelectorAll('.con>section')]

    function init() {
        getdata('哈密瓜', 1, 7);
        scroll();
    }

    function getdata(data, skip, limit) {
        mui.ajax('/getdata', {
            data: {
                name: data,
                skip: skip,
                limit: limit
            },
            success(rs) {
                const data = rs.data;
                renderList(data)
            }
        })
    }

    function waterfull(data) {
        data.map(function(item) {
            if (!a.length) {
                a.push(item);
                return;
            }
            if (!b.length) {
                b.push(item);
                return;
            }
            if (a.reduce((s, v) => { return s += v.H }) < b.reduce((s, v) => { return s + v.H })) {
                a.push(item)
            } else {
                b.push(item)
            }
        })
        return [a, b]
    }

    function renderList(data) {
        sdata = waterfull(data)
        sdata.map(function(item, i) {
            box[i].innerHTML = item.map((evey) => {
                return `<dl>
                <dt><img src="img/${evey.img}" alt="" style='height:${evey.H}px'></dt>
                <dd>${evey.use}</dd>
            </dl>`
            }).join('')
        })
    }

    function scroll() {
        BS.on('scroll', function() {
            if (this.y < this.maxScrollY - 50) {
                flag = true;
                pulldown.innerHTML = '释放加载。。。。'
            } else {
                flag = false;
                pulldown.innerHTML = '上拉加载'
            }
        })
        BS.on('scrollEnd', function() {
            if (flag) {
                page++;
                getdata('哈密瓜', (page - 1) * 6, 6);
                pulldown.innerHTML = '上拉加载'
            } else {
                pulldown.innerHTML = '没有更多数据'
            }
        })
    }
    init()
});