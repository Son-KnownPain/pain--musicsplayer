/* 
    1. Render songs -> Oke
    2. Scroll top -> Oke
    3. Play / pause / seek -> Oke
    4. CD rotate -> Oke
    5. Next / prev -> Oke
    6. Random -> Oke
    7. Next / Repeat when ended -> Oke
    8. Active song
    9. Scroll active song into view
    10. Play song when i click
*/


const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const PLAYER_CONFIG = 'PAIN_MUSICS_CONFIG'

const cd = $('.cd')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const player = $('.player')
const playBtn = $('.btn-toggle-play')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playlist = $('.playlist')

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PLAYER_CONFIG)) || {},
    setConfig: function(key, value) {
        this.config[key] = value
        localStorage.setItem(PLAYER_CONFIG, JSON.stringify(this.config))
    },
    loadConfig: function() {
        // Set config in app
        this.isRandom = this.config.isRandom ? this.config.isRandom : false
        this.isRepeat = this.config.isRepeat ? this.config.isRepeat : false
    },
    songs: [
        {
            name: 'Ai Đưa Em Về',
            singer: 'TIA',
            path: './asset/musics/aiduaemve',
            image: './asset/images/aiduaemve.jfif'
        },
        {
            name: 'Ánh Chiều Tàn',
            singer: 'D Empty ft. Poll',
            path: './asset/musics/anhchieutan',
            image: './asset/images/anhchieutan.jfif'
        },
        {
            name: 'Anh Đâu Có Hay',
            singer: 'LEMESE',
            path: './asset/musics/anhdaucohay',
            image: './asset/images/anhdaucohay.jpg'
        },
        {
            name: 'Berlin',
            singer: 'Khoi Vu',
            path: './asset/musics/berlin',
            image: './asset/images/berlin.jpg'
        },
        {
            name: 'Chẳng Giống Giáng Sinh',
            singer: 'Lu ft. Willistic',
            path: './asset/musics/changgionggiangsinh',
            image: './asset/images/changgionggiangsinh.jpg'
        },
        {
            name: 'I.F.L.Y',
            singer: 'Bazzi',
            path: './asset/musics/ifly',
            image: './asset/images/ifly.jpg'
        },
        {
            name: 'Là Bạn Không Thể Yêu',
            singer: 'Chang ft. LEMESE',
            path: './asset/musics/labankhongtheyeu',
            image: './asset/images/labankhongtheyeu.jpg'
        },
        {
            name: 'Lỡ Say Bye Là Bye',
            singer: 'Bazzi',
            path: './asset/musics/losaybyelabye',
            image: './asset/images/losaybyelabye.jfif'
        },
        {
            name: 'Nếu Anh Thấy Lòng Mình Yếu Đuối',
            singer: 'Tùa',
            path: './asset/musics/neuanhthaylongminhyeuduoi',
            image: './asset/images/neuanhthaylongminhyeuduoi.jfif'
        },
        {
            name: 'Ngày Yêu Mới',
            singer: 'Nguyễn Hữu Kha',
            path: './asset/musics/ngayyeumoi',
            image: './asset/images/ngayyeumoi.jfif'
        },
        {
            name: 'Những Gì Anh Nói',
            singer: 'BOZITT',
            path: './asset/musics/nhunggianhnoi',
            image: './asset/images/nhunggianhnoi.jpg'
        },
        {
            name: 'Nước Mắt Em Lau Bằng Tình Yêu Mới',
            singer: 'DALAB ft. Tóc Tiên',
            path: './asset/musics/nuocmatemlaubangtinhyeumoi',
            image: './asset/images/nuocmatemlaubangtinhyeumoi.jpg'
        },
        {
            name: 'Răng Khôn',
            singer: 'Phí Phương Anh ft. RIN9',
            path: './asset/musics/rangkhon',
            image: './asset/images/rangkhon.jpg'
        },
        {
            name: 'Sài Gòn Đau Lòng Quá',
            singer: 'Hứa Kim Tuyền ft. Hoàng Duyên',
            path: './asset/musics/saigondaulongqua',
            image: './asset/images/saigondaulongqua.jpg'
        },
        {
            name: 'Sài Gòn Hôm Nay Mưa',
            singer: 'JSOL ft. Hoàng Duyên',
            path: './asset/musics/saigonhomnaymua',
            image: './asset/images/saigonhomnaymua.jfif'
        },
        {
            name: 'Tell Your Mom II',
            singer: 'Winno ft. Heily (Gii Remake)',
            path: './asset/musics/tellyourmomii',
            image: './asset/images/tellyourmomii.jpg'
        },
        {
            name: 'Tháng Năm ( The Playah )',
            singer: 'Soobin Hoàng Sơn',
            path: './asset/musics/thangnamplayah',
            image: './asset/images/thangnamplayah.jfif'
        }
    ],
    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex]
            }
        })
    },
    render: function () {
        const htmls = this.songs.map((song, index) => `
                      <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
                          <div class="thumb" style="background-image: url('${song.image}')">
                          </div>
                          <div class="body">
                            <h3 class="title">${song.name}</h3>
                            <p class="author">${song.singer}</p>
                          </div>
                          <div class="option">
                            <i class="fas fa-ellipsis-h"></i>
                          </div>
                      </div>
                      `)
        $('.playlist').innerHTML = htmls.join('')
    },
    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
        this.render()
        this.scrollActiveSong()
    },
    handleEvents: function () {

        const _this = this

        // Xử lí quay CD / dừng

        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 10000, // 10 seconds
            iterations: Infinity
        })
        cdThumbAnimate.pause()

        //   Hide CD when i scroll Y

        const cdWidth = cd.offsetWidth

        document.onscroll = function () {
            const offsetTop = window.scrollY || document.documentElement.offsetTop
            const newCdWidth = cdWidth - offsetTop

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.opacity = newCdWidth / cdWidth
        }

        //   Play / pause / seek
        playBtn.onclick = function () {
            if (_this.isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }
        }

        //   Khi bài hát được phát
        audio.onplay = function () {
            _this.isPlaying = true
            player.classList.add('playing')
            cdThumbAnimate.play()

            // Tiến độ bài hát
            audio.ontimeupdate = function () {
                const progressPercent = Math.floor((this.currentTime / this.duration) * 100)

                progress.value = progressPercent
            }
        }

        //   Khi bài hát bị dừng
        audio.onpause = function () {
            _this.isPlaying = false
            player.classList.remove('playing')
            cdThumbAnimate.pause()
        }

        //   Tua
        progress.onchange = function (e) {
            const seekTime = audio.duration / 100 * progress.value
            audio.currentTime = seekTime
        }

        // Next song
        nextBtn.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.nextSong()
            }
            audio.play()
        }

        // prev song
        prevBtn.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.prevSong()
            }
            audio.play()
        }

        // On/off random
        randomBtn.onclick = function () {
            _this.isRandom = !_this.isRandom
            randomBtn.classList.toggle('active', _this.isRandom)
            _this.setConfig('isRandom', _this.isRandom)
        }

        // On/off repeat
        repeatBtn.onclick = function () {
            _this.isRepeat = !_this.isRepeat
            repeatBtn.classList.toggle('active', _this.isRepeat)
            _this.setConfig('isRepeat', _this.isRepeat)
        }

        // Khi end song
        audio.onended = function () {
            nextBtn.click()
        }

        // Khi click song in playlist
        playlist.onclick = function(e) {
            const songActiveElement = e.target.closest('.song.active')
            const songElement = e.target.closest('.song')
            const optionElement = e.target.closest('.option')
            if (!songActiveElement || optionElement) {
                // Xử lí click option
                if (optionElement) {
                    // Code....!
                } else {
                    // Xử lí click song
                    if (songElement) {
                        _this.currentIndex = Number(songElement.dataset.index)
                        _this.loadCurrentSong()
                        audio.play()
                    }
                }
            }
        }

    },
    nextSong: function () {
        this.currentIndex++
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },
    prevSong: function () {
        this.currentIndex--
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
    },
    playRandomSong: function () {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex === this.currentIndex)

        this.currentIndex = newIndex
        this.loadCurrentSong()
    },
    scrollActiveSong: function() {
        setTimeout(function() {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            })
        }, 250)
    },
    start: function () {
        // Load config into app
        this.loadConfig()

        //   Định nghĩa các thuộc tính
        this.defineProperties()

        // Tải bài hát đầu tiên vào UI khi chạy app
        this.loadCurrentSong()

        //   Lắng nghe và xử lí sự kiện (DOM events)
        this.handleEvents()

        //   Render playlist UI
        this.render()

        // Render UI
        repeatBtn.classList.toggle('active', this.isRepeat)
        randomBtn.classList.toggle('active', this.isRandom)
    }
}
app.start()