" Reload .vimrc and :PlugInstall

call plug#begin('~/.vim/plugged')

Plug 'junegunn/vim-easy-align'

Plug 'scrooloose/nerdtree', { 'on':  'NERDTreeToggle' }
Plug 'tpope/vim-fireplace', { 'for': 'clojure' }
Plug 'othree/html5.vim'
Plug 'tomasr/molokai'
Plug 'Valloric/YouCompleteMe', {'do': './install.py'}
Plug 'mattn/emmet-vim'
Plug 'jelera/vim-javascript-syntax'
Plug 'kien/ctrlp.vim'

" 补齐{}，（）
Plug 'Raimondi/delimitMate'

"Plug 'majutsushi/tagbar'
call plug#end()

"======================================
" 打开/关闭 nerdtree
nmap <F2> :NERDTree  <CR>

"nmap <F8> :TagbarToggle<CR>

"======================================
" 显示行号
set nu
set autoindent
set hlsearch " 将搜索内容反白
set ruler "显示标尺"
set tabstop=4 "制表符宽度为4"
set softtabstop=4
set shiftwidth=4 "缩进的空格数为4"

"======================================
" youcompleteme setting
let g:ycm_server_keep_logfiles = 1
let g:ycm_server_log_level = 'debug'

" monokai background color
let g:molokai_original = 1










"


