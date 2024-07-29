const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const player = $(".player");
const cd = $(".cd");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const progress = $("#progress");
const prevBtn = $(".btn-prev");
const nextBtn = $(".btn-next");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playlist = $(".playlist");

const PLAYER_STORAGE_KEY = "QUAN";

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY))||{},
    setConfig: function(key,value){
        this.config[key]=value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
    },
    songs: [
        {
            name: "Đã lỡ yêu em nhiều",
            singer: "JustaTee",
            path: "assets/music/song1.mp3",
            image: "assets/images/img1.png"
        },
        {
            name: "Ghé qua",
            singer: "Dick x Tofu x PC",
            path: "assets/music/song2.mp3",
            image: "assets/images/img2.png"
        },
        {
            name: "Ngày đẹp trời để nói chia tay",
            singer: "Lou Hoàng",
            path: "assets/music/song3.mp3",
            image: "assets/images/img3.png"
        },
        {
            name: "Đường một chiều",
            singer: "Huỳnh Tú x Magazine",
            path: "assets/music/song4.mp3",
            image: "assets/images/img4.png"
        },
        {
            name: "Đừng làm trái tim anh đau",
            singer: "Sơn Tùng M-TP",
            path: "assets/music/song5.mp3",
            image: "assets/images/img5.png"
        },
        {
            name: "Âm thầm bên em",
            singer: "Sơn Tùng M-TP",
            path: "assets/music/song6.mp3",
            image: "assets/images/img6.png"
        },
        {
            name: "Suýt nữa thì",
            singer: "Andiez",
            path: "assets/music/song7.mp3",
            image: "assets/images/img7.png"
        }
    ],

    render: function () {
        const htmls = this.songs.map((song,index) => {
            return `
                <div class="song ${index===this.currentIndex?'active':''}">
                    <div class="thumb"
                    style="background-image: url('${song.image}')">
                    </div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            `;
        })
        playlist.innerHTML = htmls.join("");
    },

    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex];
            },
        });
    },

    handleEvents: function () {
        const cd = $('.cd');
        const cdWidth = cd.offsetWidth;

        // Xử lý CD quay
        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)'}
        ],{
            duration: 15000,
            iterations: Infinity,
        })
        cdThumbAnimate.pause();

        // phóng to, thu nhỏ CD
        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
            cd.style.opacity = newCdWidth / cdWidth;
        }

        // xử lý khi click play
        playBtn.onclick = function () {
            if (app.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        }

        // Khi bài hát được chạy
        audio.onplay = function () {
            app.isPlaying = true;
            player.classList.add('playing');
            cdThumbAnimate.play();
        }

        // Khi bài hát tạm dừng
        audio.onpause = function () {
            app.isPlaying = false;
            player.classList.remove('playing');
            cdThumbAnimate.pause();
        }
                
        // Khi tiến độ bài hát thay đổi
        let isSeeking = false;

        function updateProgress() {
            if (!isSeeking && audio.duration) {
                const percentage = Math.floor(audio.currentTime / audio.duration * 100);
                progress.value = percentage;
            }
            requestAnimationFrame(updateProgress);
        }

        audio.ontimeupdate = function () {
            requestAnimationFrame(updateProgress);
        };

        progress.onmousedown = function () {
            isSeeking = true;
        };

        progress.onmouseup = function () {
            isSeeking = false;
        };

        // Xử lý khi tua bài hát
        progress.onchange = function (e) {
            const seekTime = (e.target.value / 100) * audio.duration;
            audio.currentTime = seekTime;
        };

        // Xử lý khi next bài hát
        nextBtn.onclick = function () {
            if(app.isRandom){
                app.playRandomSong();
            }else{
                app.nextSong();
            }
            audio.play();
        };

        // Xử lý khi prev bài hát
        prevBtn.onclick = function () {
            if(app.isRandom){
                app.playRandomSong();
            } else{
                app.prevSong();
            }
            audio.play();
        };

        // Xử lý khi random bài hát
        randomBtn.onclick = function () {
            app.isRandom = !app.isRandom;
            randomBtn.classList.toggle('active', app.isRandom);
            app.setConfig('isRandom', app.isRandom);
        };

        // Xử lý khi repeat bài hát
        repeatBtn.onclick = function () {
            app.isRepeat =!app.isRepeat;
            repeatBtn.classList.toggle('active', app.isRepeat);
            app.setConfig('isRepeat', app.isRepeat);
        };

        // Xử lý khi bấm vào bài hát
        playlist.onclick = function (e) {
            if (e.target.tagName === 'I'||e.target.closest('.song.active')) return;
            const songElement = e.target.closest('.song');
            const index = Array.from(playlist.children).indexOf(songElement);
            app.currentIndex = index;
            app.loadCurrentSong();
            audio.play();
        };

        // Xử lý khi end bài hát
        audio.onended = function () {
            if (app.isRepeat) {
                audio.play();
            } else {
                nextBtn.click();
            }
        };
    },

    updateActiveSong: function () {
        const previousActive = playlist.querySelector('.song.active');
        if (previousActive) {
            previousActive.classList.remove('active');
        }
        const currentActive = playlist.children[this.currentIndex];
        if (currentActive) {
            currentActive.classList.add('active');
        }
    },

    scrollToActiveSong: function () {
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior:'smooth',
                block: 'end'
            });
        }, 300)
    },

    loadCurrentSong: function () {
        this.scrollToActiveSong();
        this.updateActiveSong();
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;
    },

    loadConfig: function () {
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;
        randomBtn.classList.toggle('active', app.isRandom);
        repeatBtn.classList.toggle('active', app.isRepeat);
    },

    nextSong: function() {
        this.currentIndex = (this.currentIndex + 1) % this.songs.length;
        this.loadCurrentSong();
    },

    prevSong: function() {
        this.currentIndex = (this.currentIndex - 1 + this.songs.length) % this.songs.length;
        this.loadCurrentSong();
    },

    playRandomSong: function() {
        let oldIdx = this.currentIndex;
        do {
            this.currentIndex = Math.floor(Math.random() * this.songs.length);
        } while(this.currentIndex===oldIdx);
        this.loadCurrentSong();
    },

    start: function () {
        this.loadConfig();
        this.defineProperties();
        this.handleEvents();
        this.loadCurrentSong();
        this.render();
    }
};

app.start();