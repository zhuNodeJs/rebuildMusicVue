<div class="my-player">
    <!-- 正常的播放器 -->
    <transition name='normal'
                @enter="enter"
                @after-enter='afterEnter'
                @leave='leave'
                @after-leave='afterLeave'>
      <div v-show="fullScreen" class="normal-player">
        <!-- 背景图 -->
        <div class="background">
          <img :src="currentSong.img" width="100%" height="100%">
        </div>

        <!-- 顶部 -->
        <div class="top">
          <!-- 返回按钮 -->
          <div class="back" @click='back'>
            <i class="icon-back"></i>
          </div>

          <p v-html="currentSong.name" class="title"></p>
          <p v-html="currentSong.singer" class="subtitle"></p>
        </div>

        <!-- 中部 -->
        <div class="middle"
             @touchstart.prevent='middleTouchStart'
             @touchmove.prevent='middleTouchMove'
             @touchend='middleTouchend'>
          <!-- 唱片 -->
          <div class="middle-l" ref="middleRef">
            <div class="cd-wrapper" ref="cdRef">
              <div class="cd" :class='playing ? "play" : "play pause"'>
                <img :src="currentSong.img" class="image" alt="">
              </div>
            </div>

            <!-- cd 页小段歌词 -->
            <div class="playing-lyric-wrapper">
              <div class="playing-lyric">{{playingLyric}}</div>
            </div>
          </div>

          <!-- 歌词 -->
          <my-scroll ref="lyricList" :data='currentLyric && currentLyric.lines' class="middle-r">
            <div class="lyric-wrapper">
              <div v-if="currentLyric">
                <p ref="lyricLine"
                    v-for="(line,index) in currentLyric.lines"
                    :class='{"current": currentLyricLine} === index'
                    class="text">{{line.txt}}</p>
              </div>
            </div>
          </my-scroll>
        </div>

        <!-- 底部操作区 -->
        <div class="bottom">
          <!-- 分页点 -->
          <div class="dot-wrapper">
            <span :class='{"active": currentDot === "cd"}' class='dot'></span>
            <span :class='{"active": currentDot === "cd"}' class='dot'></span>
          </div>
          <!-- 播放进度 -->
          <div class="progress-wrapper">
            <span class='time time-l'>{{currentTime | format}}</span>

            <!-- 进度条组件 -->
            <div class="progress-bar-wrapper">
              <my-progress-bar :percent='percent' @percentChange='percentChange'></my-progress-bar>
            </div>

            <span class="time time-r">{{currentSong.duration | format}}</span>
          </div>

          <!-- 底部操作区 -->
          <div class="operators">
            <div class="icon i-left">
              <i :class='iconMode'></i>
            </div>
            <div class="icon i-left" :class='songCanplay ? "" : "disable"'>
              <i class="icon-prev" @click='prevSong'></i>
            </div>
            <div class="icon i-center" :class='songCanplay ? "" : "disable"'>
              <i @click='togglePlaying' :class='playing ? "icon-pause" : "icon-play"'></i>
            </div>
            <div class="icon i-right" :class='songCanplay ? "" : "disable"'>
              <i @click='nextSong' class='icon-next'></i>
            </div>
            <div class="icon i-right">
              <i class="icon" :class='getFavoriteCls(currentSong)' @click='toggleFavoriteCls(currentSong)'></i>
            </div>
          </div>
        </div>
      </div>
    </transition>


    <!-- 最小化的播放器 -->
    <transition name='mini'>
      <div @click='open' v-show="!fullScreen" class="mini-player">
        <div class="icon">
          <img :src="currentSong.img" width="40" height="40" :class='playing ? "play" : "play pause"' alt="">
        </div>

        <div class="text">
          <p v-html="currentSong.name" class="name"></p>
          <p v-html="currentSong.singer" class="desc"></p>
        </div>

        <div class="control">
          <!-- 圆形进度条 -->
          <my-progress-circle :percent='percent' :radius='32'>
            <i class="icon-mini" @click.stop='togglePlaying' :class='playing ? "icon-pause-mini" : "icon-play-mini"'></i>
          </my-progress-circle>
        </div>

        <div class="control" @click.stop='showPlayList'>
          <i class="icon-playlist"></i>
        </div>
      </div>
    </transition>

    <my-playlist ref="playlistRef"></my-playlist>

    <!-- 播放器 -->
    <audio :src="currentSong.url"
           ref="audioRef"
           @play='canplay'
           @error='error'
           @timeupdate='timeupdate'
           @ended='ended'>
      Your browser does not support the audio element.
    </audio>
  </div>
