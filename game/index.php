<?php
error_reporting(0);
function callAPI($method, $url, $data)
{
    $curl = curl_init();
    switch ($method) {
        case "POST":
            curl_setopt($curl, CURLOPT_POST, 1);
            if ($data)
                curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
            break;
        case "PUT":
            curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "PUT");
            if ($data)
                curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
            break;
        default:
            if ($data)
                $url = sprintf("%s?%s", $url, http_build_query($data));
    }
    // OPTIONS:
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_HTTPHEADER, array(
        'APIKEY: 111111111111111111111',
        'Content-Type: application/json',
    ));
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    // EXECUTE:
    $result = curl_exec($curl);
    curl_close($curl);
    return $result;
}

$get_data = callAPI('GET', 'https://antrachhuynh.github.io/data.json', false);
$gamelist = json_decode($get_data, true);

?>
<!DOCTYPE html>
<html lang="en" data-theme="dark">

<head>
    <title>Play Plant vs Zombies Online</title>
    <meta name="description"
        content="Play Plant vs Zombie here for Free - A tower defense game created by PopCap Games and released on May 5, 2009. Click to Play now!">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#121217">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="HandheldFriendly" content="True">
    <meta http-equiv="cleartype" content="on">
    <link rel="dns-prefetch" href="//ajax.googleapis.com" />
    <link rel="dns-prefetch" href="//www.googletagmanager.com" />
    <link rel="dns-prefetch" href="//fonts.googleapis.com" />
    <link rel="dns-prefetch" href="//fonts.gstatic.com" />
    <link rel="dns-prefetch" href="//cdnjs.cloudflare.com" />
    <link rel="dns-prefetch" href="//www.google-analytics.com">
    <link rel="canonical" href="https://pvz.ee">
    <link rel="preload" as="font" type="font/woff2"
        href="https://porkgames.com/public/assets/fonts/Inter-Regular.woff2?v=3.19" crossorigin="anonymous">
    <link rel="preload" as="font" type="font/woff2"
        href="https://porkgames.com/public/assets/fonts/Inter-SemiBold.woff2?v=3.19" crossorigin="anonymous">
    <link rel="preload" as="font" type="font/woff2"
        href="https://porkgames.com/public/assets/fonts/Inter-Medium.woff2?v=3.19" crossorigin="anonymous">
    <link rel="preload" as="font" type="font/woff2"
        href="https://porkgames.com/public/assets/fonts/Inter-Bold.woff2?v=3.19" crossorigin="anonymous">
    <link rel="preload" as="font" type="font/woff2"
        href="https://porkgames.com/public/assets/fonts/Inter-ExtraBold.woff2?v=3.19" crossorigin="anonymous">
    <link rel="preload" as="style" href="https://porkgames.com/app/theme/assets/css/theme.css?v=1.0.0" />
    <link rel="preload" as="script" href="https://porkgames.com/app/theme/assets/js/jquery.min.js?v=1.0.0" />
    <link media="all" rel="stylesheet" href="https://porkgames.com/app/theme/assets/css/theme.css?v=1.0.0"
        type="text/css">
    <link rel="shortcut icon" href="https://porkgames.com/public/static/favicon.svg?v=1.0.0">
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/gracehuynhh/doodlejump/w3navigation.css" />

    <script type="text/javascript">
        var Base = "https://porkgames.com";
        var Assets = "https://porkgames.com/public/assets";
        var _Auth = false;
        var __ = function (msgid) {
            return window.i18n[msgid] || msgid;
        };
        window.i18n = {
            'more': 'more',
            'less': 'less',
            'No comments yet': 'No comments yet',
        };
    </script>
    <style type="text/css">
        :root {
            --theme-color: #ff4c44;
            --xp-color: #ff4c44;
            ;
        }
    </style>
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6875580793823494"
        crossorigin="anonymous"></script>
</head>

<body class="min-vh-100 layout d-flex flex-column">
    <nav class="navbar navbar-expand-lg layout-header navbar-dark">
        <div class="container-fluid">
            <button class="navbar-toggler border-0 shadow-none px-0" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <a href="https://porkgames.com" class="navbar-brand dark-logo me-lg-4">
                <img src="https://porkgames.com/public/static/logo.png" height="30" alt="Porkgames">
            </a>
            <a href="https://porkgames.com" class="navbar-brand light-logo me-lg-4">
                <img src="https://porkgames.com/public/static/dark_logo.png" height="30" alt="Porkgames">
            </a>
            <button class="navbar-toggler border-0 shadow-none px-0" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
                <svg width="24" height="24" stroke="currentColor" stroke-width="1.75" fill="none">
                    <use xlink:href="sprite.svg#search"></use>
                </svg>
            </button>
            <div class="collapse navbar-collapse" id="navbar">
                <ul class="navbar-nav mb-2 mb-lg-0 fs-sm align-items-lg-center">
                    <li class="nav-item">
                        <a class="nav-link" href="https://porkgames.com/games/">Newest</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="https://porkgames.com/games/most-popular">Most popular</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="https://porkgames.com/random">
                            Random</a>
                    </li>
                </ul>
                <form class="form-search w-xxl-300 w-xl-250 ms-xl-4 mb-3 mb-lg-0" action="https://porkgames.com/search"
                    method="post">
                    <input type="hidden" name="_TOKEN"
                        value="JDJ5JDEwJFhxRm05RDRHa2pmNS5jYzBsN3Q0LnVLUzBoTVE0cHNSd1BDQ0hHOWdUeHlUMGhQaUNMVzcy">
                    <input type="hidden" name="_ACTION" value="search">
                    <div class="input-group input-group-inline shadow-none">
                        <span class="input-group-text bg-transparent border-0 text-gray-500 shadow-none ps-0 pe-3">
                            <svg width="18" height="18" stroke="currentColor" stroke-width="1.75" fill="none">
                                <use xlink:href="sprite.svg#search"></use>
                            </svg>
                        </span>
                        <input type="text" name="q" class="form-control form-control-flush bg-transparent border-0 ps-0"
                            id="search" placeholder="Search .." aria-label="Search" required="true" minlength="3">
                    </div>
                </form>
                <ul class="navbar-nav mb-2 mb-lg-0 fw-semibold align-items-xl-center ms-xl-auto">
                    <li class="nav-item">
                        <a href="https://porkgames.com/leaderboard" class="nav-link" data-bs-tooltip="tooltip"
                            data-bs-placement="bottom" title="Leaderboard">
                            <svg width="16" height="16" fill="currentColor">
                                <use xlink:href="sprite.svg#leader"></use>
                            </svg>
                        </a>
                    </li>
                    <li class="nav-item">
                        <div class="nav-link color-toggle">
                            <div class="light">
                                <svg width="20" height="20" stroke="currentColor" stroke-width="1.75" fill="none">
                                    <use xlink:href="sprite.svg#sun"></use>
                                </svg>
                            </div>
                            <div class="dark">
                                <svg width="20" height="20" stroke="currentColor" stroke-width="1.75" fill="none">
                                    <use xlink:href="sprite.svg#moon"></use>
                                </svg>
                            </div>
                        </div>
                    </li>
                    <li class="nav-item">
                        <a href="https://porkgames.com/login" class="nav-link fs-sm fw-normal">
                            Login</a>
                    </li>
                    <li class="nav-item">
                        <a href="https://porkgames.com/register" class="nav-link fs-sm fw-normal">
                            Sign up</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <div class="layout-section">
        <div class="container-fluid">
            <div class="row">

                <div class="col-lg">
                    <div class="ratio ratio-16x9 overflow-hidden rounded-3 mb-4 game-ratio">
                        <iframe class="game-iframe lazyload" data-src="iframe.php" width="900" height="500"
                            scrolling="none" frameborder="0" allowfullscreen></iframe>
                    </div>
                    <div class="px-lg-3">
                        <div class="row">
                            <div class="col-lg">
                                <div class="mb-3">
                                    <div class="card-category">
                                        <a href="https://porkgames.com/category/racing">
                                            Racing</a>
                                        <a href="https://porkgames.com/category/skill">
                                            Skill</a>
                                    </div>
                                    <h1 class="h4">
                                        Plant vs. Zombies </h1>
                                    <div class="rating-star ms-auto mt-2">
                                        <i class="bg-warning"></i><i class="bg-warning"></i><i class="bg-warning"></i><i
                                            class="bg-warning"></i><i class="bg-warning"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-auto text-xl-end">
                                <div class="w-lg-300">
                                    <div class="mb-2 d-flex align-items-center justify-content-lg-end flex-nowrap">
                                        <div class="dropdown mx-1 py-1" data-bs-tooltip="tooltip"
                                            data-bs-placement="top" title="Share">
                                            <button class="btn btn-square btn-ghost rounded-circle dropdown-toggle"
                                                type="button" id="shareDropdown" data-bs-toggle="dropdown"
                                                aria-expanded="false" data-bs-auto-close="outside">
                                                <svg width="14" height="14" fill="currentColor">
                                                    <use xlink:href="sprite.svg#share"></use>
                                                </svg>
                                            </button>
                                            <div class="dropdown-menu border-0 bg-transparent mt-3 p-0"
                                                aria-labelledby="shareDropdown">
                                                <div class="d-flex align-items-center">
                                                    <button
                                                        class="btn btn-square rounded-circle bg-facebook text-white mx-1 btn-share"
                                                        data-type="facebook" data-title="Moto X3M"
                                                        data-sef="https://pvz.ee">
                                                        <svg width="16" height="16" fill="currentColor">
                                                            <use xlink:href="sprite.svg#facebook"></use>
                                                        </svg>
                                                    </button>
                                                    <button
                                                        class="btn btn-square rounded-circle bg-twitter text-white mx-1 btn-share"
                                                        data-type="twitter" data-title="Moto X3M"
                                                        data-sef="https://pvz.ee">
                                                        <svg width="16" height="16" fill="currentColor">
                                                            <use xlink:href="sprite.svg#twitter"></use>
                                                        </svg>
                                                    </button>
                                                    <button
                                                        class="btn btn-square rounded-circle bg-whatsapp text-white mx-1 btn-share"
                                                        data-type="whatsapp" data-title="Moto X3M"
                                                        data-sef="https://pvz.ee">
                                                        <svg width="16" height="16" fill="currentColor">
                                                            <use xlink:href="sprite.svg#whatsapp"></use>
                                                        </svg>
                                                    </button>
                                                    <button
                                                        class="btn btn-square rounded-circle bg-telegram text-white mx-1 btn-share"
                                                        data-type="telegram" data-title="Moto X3M"
                                                        data-sef="https://pvz.ee">
                                                        <svg width="16" height="16" fill="currentColor">
                                                            <use xlink:href="sprite.svg#telegram"></use>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="dropdown mx-1 py-1" data-bs-tooltip="tooltip"
                                            data-bs-placement="top" title="" data-bs-original-title="Fullscreen">
                                            <button
                                                class="btn btn-square btn-fullscreen btn-ghost rounded-circle dropdown-toggle">
                                                <svg width="16" height="16" fill="currentColor">
                                                    <use xlink:href="sprite.svg#fullscreen"></use>
                                                </svg>
                                            </button>
                                        </div>
                                        <div class="w-lg-200 ms-4">
                                            <div class="fs-sm">
                                                0 played </div>
                                            <div class="progress mt-2 bg-transparent" style="height: 6px;">
                                                <div class="progress-bar bg-theme rounded-pill" role="progressbar"
                                                    style="width: 100%" aria-valuenow="" aria-valuemin="0"
                                                    aria-valuemax="100"></div>
                                            </div>
                                            <div
                                                class="d-flex align-items-center justify-content-center justify-content-md-end mt-2">
                                                <button class="btn btn-square btn-sm text-current reaction like "
                                                    data-id="1133">
                                                    <svg width="20" height="20" fill="currentColor">
                                                        <use xlink:href="sprite.svg#like"></use>
                                                    </svg>
                                                </button>
                                                <span class="fs-xxs ms-1 text-muted fw-semibold like-count"
                                                    data-votes="0">
                                                    0</span>
                                                <button
                                                    class="btn btn-square btn-sm text-current reaction dislike ms-3 "
                                                    data-id="1133">
                                                    <svg width="20" height="20" fill="currentColor">
                                                        <use xlink:href="sprite.svg#dislike"></use>
                                                    </svg>
                                                </button>
                                                <span class="fs-xxs ms-1 text-muted fw-semibold dislike-count"
                                                    data-votes="0">
                                                    0</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="pb-2">
                            <h3 class="fs-sm fw-semibold mb-2">
                                Control </h3>
                            <p class="text-muted fs-sm" data-more="" data-limit="6">
                                Up to accelerate
                                Down to break
                                Left/Right to balance
                                Perform flips to reduce time </p>
                        </div>
                        <div class="pb-2">
                            <h3 class="fs-sm fw-semibold mb-2">
                                Description </h3>
                            <p class="text-muted fs-sm" data-more="" data-limit="6">
                                Plant vs Zombies is an innovative, fun-filled action game that captivated the gaming
                                world. It challenges players to create mazes of different plants and fungi to fend off
                                hordes of incoming zombies. The wide variety of options for attack and defense make this
                                a highly strategic game with lots of replay value. Moreover, in addition to being an
                                entertaining experience, Plant vs Zombie provides an interactive way for young minds to
                                learn more about plant life and biology. Above all, the bright visuals and audio capture
                                the attention of a wide range of gamers and make it one of the most popular games
                                globally.

                        </div>
                        <div class="mx-auto py-3 px-2">
                        </div>
                        <div class=" mb-3">
                            <div class="layout-heading">
                                <h3 class="fs-lg fw-bold">
                                    Comments<span class="ms-3 text-muted fs-base fw-normal">(
                                        0 )</span></h3>
                            </div>
                            <div class="comments" data-content="1133" data-type="post">
                                <div class="mb-4 fs-sm text-body">
                                    The comment field is only for members. <a href="https://porkgames.com/login"
                                        class="text-current fw-semibold">
                                        Login</a>, <a href="https://porkgames.com/register"
                                        class="text-current fw-semibold ms-2">
                                        Sign up</a>
                                </div>
                                <div class="empty-total text-muted fs-sm"></div>
                                <div class="comment-toolbar comment-sorting">
                                    <ul class="nav nav-active-border">
                                        <li class="nav-item">
                                            <a href="#" class="nav-link active" data-sort="1">
                                                Newest</a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="#" class="nav-link" data-sort="2">
                                                Most popular</a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="#" class="nav-link" data-sort="3">
                                                Oldest</a>
                                        </li>
                                        <li class="nav-item ms-auto comment-total"></li>
                                    </ul>
                                </div>
                                <ul class="comments-list"></ul>
                                <div class="pagination-container"></div>
                            </div>
                        </div>
                        <script id="commentTemplate" type="text/template">
                            <li class="comment-list {% if (spoiler == '1') { %} spoiler {% } %}" data-id="{%= id %}">
    {% if (spoiler == '1') { %}
    <div class="spoiler-btn" data-id="{%= id %}">
        This comment contains spoilers. Click to read    </div>
    {% } %}
    <div class="comment-flex">
        <div class="comment-avatar">
            {% if (author.url) { %}
            <a href="{%= author.url %}" target="_blank">{%= author.avatar %}</a>
            {% } else { %}
            {%= author.avatar %}
            {% } %}
        </div>
        <div class="comment-body">
            {% if (author.url) { %}
            <a href="{%= author.url %}" target="_blank" class="comment-name">{%= author.name %}</a>
            {% } else { %}
            <span class="comment-name">{%= author.name %}</span>
            {% } %}
            <a href="#!comment={%= id %}" class="comment-date">
                <time title="{%= created %}">{%= created %}</time>
            </a>
            {% if (status == '2') { %} <span class="text-warning fs-xs">
                Pending</span> {% } %}
            <div class="comment-text">{%= comment %}</div>
            <form method="POST" class="edit-form comment-form">
                <input type="hidden" name="id" value="{%= id %}">
                <input type="hidden" name="action" value="update">
                <textarea name="comment" class="form-control mb-1" rows="1 wrap=" hard" maxlength="255" data-content="{%= comment %}" placeholder="Enter your comment"></textarea>
                <button type="submit" class="btn btn-block btn-sm btn-ghost px-xl-4 fs-xs">
                    Edit</button>
                <button type="button" class="btn cancel fs-xs">
                    Cancel</button>
                <div class="comment-alert"></div>
            </form>

            <div class="rating-star ms-auto d-flex mt-2">
                {% for (var i = 1; i <= 5; i++) { %}
                <i class="bg-warning {% if (rating < i) { %} bg-gray-400 {% } %}"></i>
                {% } %}
            </div>
            <div class="comment-footer">
                <div class="votes">
                    <a href="#" title="Like" class="like {%= (voted === 'up' ? 'voted' : '') %}">
                        <svg class="icon">
                            <use xlink:href="sprite.svg#like" />
                        </svg>
                        <span class="likes" data-votes="{%= likes %}">{%= likes || '' %}</span>
                    </a>
                    <a href="#" title="Dislike" class="dislike {%= (voted === 'down' ? 'voted' : '') %}">
                        <svg class="icon">
                            <use xlink:href="sprite.svg#dislike" />
                        </svg>
                        <span class="dislikes" data-votes="{%= dislikes %}">{%= dislikes || '' %}</span>
                    </a>
                </div>
                {% if (reply) { %}
                <a href="#" class="reply" data-parent="{%= id %}" data-root="{%= parent_id || id %}">
                    Reply</a>
                {% } %}
                {% if (edit) { %}
                <a href="#" class="quick-edit">
                    Edit</a>
                {% } %}
            </div>
            <div class="replybox"></div>
        </div>
    </div>
    <ul class="comments-list children" data-parent="{%= id %}"></ul>
</li>
</script>
                        <script id="paginationTemplate" type="text/template">
                            <ul class="pagination pagination-sm pagination-spaced mt-3">
    <li {% if (current_page===1) { %} class="disabled page-item" {% } %}>
        <a href="#!page={%= prev_page %}" data-page="{%= prev_page %}" title="Prev" class="page-link">
            Prev</a>
    </li>
    {% if (first_adjacent_page > 1) { %}
    <li class="page-item">
        <a href="#!page=1" data-page="1" class="page-link">1</a>
    </li>
    {% if (first_adjacent_page > 2) { %}
    <li class="disabled"><a class="page-link">...</a></li>
    {% } %}
    {% } %}
    {% for (var i = first_adjacent_page; i <= last_adjacent_page; i++) { %} <li class="page-item {% if (current_page === i) { %} active {% } %}">
        <a href="#!page={%= i %}" data-page="{%= i %}" class="page-link">{%= i %}</a>
        </li>
        {% } %}
        {% if (last_adjacent_page < last_page) { %} {% if (last_adjacent_page < last_page - 1) { %} <li class="disabled page-item"><a class="page-link">...</a></li>
            {% } %}
            <li class="page-item"><a href="#!page={%= last_page %}" data-page="{%= last_page %}" class="page-link">{%= last_page %}</a></li>
            {% } %}
            <li class="page-item {% if (current_page === last_page) { %} class=" disabled" {% } %}">
                <a href="#!page={%= next_page %}" data-page="{%= next_page %}" title="Next" class="page-link">
                    Next</a>
            </li>
</ul>
</script>
                        <script id="alertTemplate" type="text/template">
                            <div class="">
    {% if (typeof message === 'object') { %}
    {% for (var i in message) { %}
    <div>{%= message[i] %}</div>
    {% } %}
    {% } else { %}
    {%= message %}
    {% } %}
</div>
</script>
                    </div>
                </div>
                <div class="col-lg-auto">
                    <div class="w-lg-300">
                        <script async
                            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6875580793823494"
                            crossorigin="anonymous"></script>
                        <!-- PVZ Leftbar -->
                        <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-6875580793823494"
                            data-ad-slot="8407030137" data-ad-format="auto" data-full-width-responsive="true"></ins>
                        <script>
                            (adsbygoogle = window.adsbygoogle || []).push({});
                        </script>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="mx-auto py-3 px-2">
    </div>
    <div class="layout-section">
        <div class="container-fluid">
            <div class="layout-heading mb-3">
                <h3 class="fs-lg fw-bold">
                    You may also like </h3>
            </div>
            <div class="card-masonry">
                <a href="https://porkgames.com/play/yoyo-hero-3d" class="card large">
                    <picture>
                        <source data-srcset="https://porkgames.com/public/upload/game/PzeLZh9avN.webp" type="image/webp"
                            class="img-fluid" srcset="https://porkgames.com/public/upload/game/PzeLZh9avN.webp">
                        <source data-srcset="https://porkgames.com/public/upload/game/PzeLZh9avN.png" type="image/png"
                            class="img-fluid" srcset="https://porkgames.com/public/upload/game/PzeLZh9avN.png">
                        <img data-src="https://porkgames.com/public/upload/game/PzeLZh9avN.png" alt="Yoyo Hero 3D"
                            class="lazyload img-fluid" width="500" height="500">
                    </picture>
                    <div class="card-body">
                        <h3>
                            Yoyo Hero 3D </h3>
                    </div>
                </a>
                <a href="https://porkgames.com/play/farming-missions-2023" class="card ">
                    <picture>
                        <source data-srcset="https://porkgames.com/public/upload/game/thumb-0HpnsojZyN.webp"
                            type="image/webp" class="img-fluid"
                            srcset="https://porkgames.com/public/upload/game/thumb-0HpnsojZyN.webp">
                        <source data-srcset="https://porkgames.com/public/upload/game/thumb-0HpnsojZyN.png"
                            type="image/png" class="img-fluid"
                            srcset="https://porkgames.com/public/upload/game/thumb-0HpnsojZyN.png">
                        <img data-src="https://porkgames.com/public/upload/game/thumb-0HpnsojZyN.png"
                            alt="Farming Missions 2023" class="lazyload img-fluid" width="500" height="500">
                    </picture>
                    <div class="card-body">
                        <h3>
                            Farming Missions 2023 </h3>
                    </div>
                </a>
                <a href="https://porkgames.com/play/monster-cars-ultimate-simulator" class="card ">
                    <picture>
                        <source data-srcset="https://porkgames.com/public/upload/game/thumb-O7ZgjqmbaI.webp"
                            type="image/webp" class="img-fluid"
                            srcset="https://porkgames.com/public/upload/game/thumb-O7ZgjqmbaI.webp">
                        <source data-srcset="https://porkgames.com/public/upload/game/thumb-O7ZgjqmbaI.png"
                            type="image/png" class="img-fluid"
                            srcset="https://porkgames.com/public/upload/game/thumb-O7ZgjqmbaI.png">
                        <img data-src="https://porkgames.com/public/upload/game/thumb-O7ZgjqmbaI.png"
                            alt="Monster Cars: Ultimate Simulator" class="lazyload img-fluid" width="500" height="500">
                    </picture>
                    <div class="card-body">
                        <h3>
                            Monster Cars: Ultimate Simulator </h3>
                    </div>
                </a>
                <a href="https://porkgames.com/play/trainsio-3d" class="card large">
                    <picture>
                        <source data-srcset="https://porkgames.com/public/upload/game/eIFWtU6eu3.webp" type="image/webp"
                            class="img-fluid" srcset="https://porkgames.com/public/upload/game/eIFWtU6eu3.webp">
                        <source data-srcset="https://porkgames.com/public/upload/game/eIFWtU6eu3.png" type="image/png"
                            class="img-fluid" srcset="https://porkgames.com/public/upload/game/eIFWtU6eu3.png">
                        <img data-src="https://porkgames.com/public/upload/game/eIFWtU6eu3.png" alt="Trains.io 3D"
                            class="lazyload img-fluid" width="500" height="500">
                    </picture>
                    <div class="card-body">
                        <h3>
                            Trains.io 3D </h3>
                    </div>
                </a>
                <a href="https://porkgames.com/play/life-of-ocean-queen" class="card ">
                    <picture>
                        <source data-srcset="https://porkgames.com/public/upload/game/thumb-A1nHzzg6R2.webp"
                            type="image/webp" class="img-fluid"
                            srcset="https://porkgames.com/public/upload/game/thumb-A1nHzzg6R2.webp">
                        <source data-srcset="https://porkgames.com/public/upload/game/thumb-A1nHzzg6R2.png"
                            type="image/png" class="img-fluid"
                            srcset="https://porkgames.com/public/upload/game/thumb-A1nHzzg6R2.png">
                        <img data-src="https://porkgames.com/public/upload/game/thumb-A1nHzzg6R2.png"
                            alt="Life of ocean Queen" class="lazyload img-fluid" width="500" height="500">
                    </picture>
                    <div class="card-body">
                        <h3>
                            Life of ocean Queen </h3>
                    </div>
                </a>
                <a href="https://porkgames.com/play/classic-war-tankz" class="card ">
                    <picture>
                        <source data-srcset="https://porkgames.com/public/upload/game/thumb-2n4qZhqwIc.webp"
                            type="image/webp" class="img-fluid"
                            srcset="https://porkgames.com/public/upload/game/thumb-2n4qZhqwIc.webp">
                        <source data-srcset="https://porkgames.com/public/upload/game/thumb-2n4qZhqwIc.png"
                            type="image/png" class="img-fluid"
                            srcset="https://porkgames.com/public/upload/game/thumb-2n4qZhqwIc.png">
                        <img data-src="https://porkgames.com/public/upload/game/thumb-2n4qZhqwIc.png"
                            alt="Classic War Tankz" class="lazyload img-fluid" width="500" height="500">
                    </picture>
                    <div class="card-body">
                        <h3>
                            Classic War Tankz </h3>
                    </div>
                </a>
                <a href="https://porkgames.com/play/farmer-challenge-party" class="card ">
                    <picture>
                        <source data-srcset="https://porkgames.com/public/upload/game/thumb-JrY9VRF0uo.webp"
                            type="image/webp" class="img-fluid"
                            srcset="https://porkgames.com/public/upload/game/thumb-JrY9VRF0uo.webp">
                        <source data-srcset="https://porkgames.com/public/upload/game/thumb-JrY9VRF0uo.png"
                            type="image/png" class="img-fluid"
                            srcset="https://porkgames.com/public/upload/game/thumb-JrY9VRF0uo.png">
                        <img data-src="https://porkgames.com/public/upload/game/thumb-JrY9VRF0uo.png"
                            alt="Farmer Challenge Party" class="lazyload img-fluid" width="500" height="500">
                    </picture>
                    <div class="card-body">
                        <h3>
                            Farmer Challenge Party </h3>
                    </div>
                </a>
                <a href="https://porkgames.com/play/rope-dude" class="card ">
                    <picture>
                        <source data-srcset="https://porkgames.com/public/upload/game/thumb-2GKqTZASdB.webp"
                            type="image/webp" class="img-fluid"
                            srcset="https://porkgames.com/public/upload/game/thumb-2GKqTZASdB.webp">
                        <source data-srcset="https://porkgames.com/public/upload/game/thumb-2GKqTZASdB.png"
                            type="image/png" class="img-fluid"
                            srcset="https://porkgames.com/public/upload/game/thumb-2GKqTZASdB.png">
                        <img data-src="https://porkgames.com/public/upload/game/thumb-2GKqTZASdB.png" alt="Rope Dude"
                            class="lazyload img-fluid" width="500" height="500">
                    </picture>
                    <div class="card-body">
                        <h3>
                            Rope Dude </h3>
                    </div>
                </a>
                <a href="https://porkgames.com/play/stickman-jailbreak-love-story" class="card ">
                    <picture>
                        <source data-srcset="https://porkgames.com/public/upload/game/thumb-39jDlTEp3D.webp"
                            type="image/webp" class="img-fluid"
                            srcset="https://porkgames.com/public/upload/game/thumb-39jDlTEp3D.webp">
                        <source data-srcset="https://porkgames.com/public/upload/game/thumb-39jDlTEp3D.png"
                            type="image/png" class="img-fluid"
                            srcset="https://porkgames.com/public/upload/game/thumb-39jDlTEp3D.png">
                        <img data-src="https://porkgames.com/public/upload/game/thumb-39jDlTEp3D.png"
                            alt="Stickman Jailbreak - Love Story" class="lazyload img-fluid" width="500" height="500">
                    </picture>
                    <div class="card-body">
                        <h3>
                            Stickman Jailbreak - Love Story </h3>
                    </div>
                </a>
                <a href="https://porkgames.com/play/happy-lamb" class="card ">
                    <picture>
                        <source data-srcset="https://porkgames.com/public/upload/game/thumb-3AT1RybOgN.webp"
                            type="image/webp" class="img-fluid"
                            srcset="https://porkgames.com/public/upload/game/thumb-3AT1RybOgN.webp">
                        <source data-srcset="https://porkgames.com/public/upload/game/thumb-3AT1RybOgN.png"
                            type="image/png" class="img-fluid"
                            srcset="https://porkgames.com/public/upload/game/thumb-3AT1RybOgN.png">
                        <img data-src="https://porkgames.com/public/upload/game/thumb-3AT1RybOgN.png" alt="Happy Lamb"
                            class="lazyload img-fluid" width="500" height="500">
                    </picture>
                    <div class="card-body">
                        <h3>
                            Happy Lamb </h3>
                    </div>
                </a>
                <a href="https://porkgames.com/play/winx-club-dress-up" class="card ">
                    <picture>
                        <source data-srcset="https://porkgames.com/public/upload/game/thumb-unf0Idel5F.webp"
                            type="image/webp" class="img-fluid"
                            srcset="https://porkgames.com/public/upload/game/thumb-unf0Idel5F.webp">
                        <source data-srcset="https://porkgames.com/public/upload/game/thumb-unf0Idel5F.png"
                            type="image/png" class="img-fluid"
                            srcset="https://porkgames.com/public/upload/game/thumb-unf0Idel5F.png">
                        <img data-src="https://porkgames.com/public/upload/game/thumb-unf0Idel5F.png"
                            alt="Winx Club: Dress Up" class="lazyload img-fluid" width="500" height="500">
                    </picture>
                    <div class="card-body">
                        <h3>
                            Winx Club: Dress Up </h3>
                    </div>
                </a>
                <a href="https://porkgames.com/play/idle-pinball-breakout" class="card ">
                    <picture>
                        <source data-srcset="https://porkgames.com/public/upload/game/thumb-ai6ibs7EcB.webp"
                            type="image/webp" class="img-fluid"
                            srcset="https://porkgames.com/public/upload/game/thumb-ai6ibs7EcB.webp">
                        <source data-srcset="https://porkgames.com/public/upload/game/thumb-ai6ibs7EcB.png"
                            type="image/png" class="img-fluid"
                            srcset="https://porkgames.com/public/upload/game/thumb-ai6ibs7EcB.png">
                        <img data-src="https://porkgames.com/public/upload/game/thumb-ai6ibs7EcB.png"
                            alt="Idle Pinball Breakout" class="lazyload img-fluid" width="500" height="500">
                    </picture>
                    <div class="card-body">
                        <h3>
                            Idle Pinball Breakout </h3>
                    </div>
                </a>
                <a href="https://porkgames.com/play/hopper-bunny" class="card ">
                    <picture>
                        <source data-srcset="https://porkgames.com/public/upload/game/thumb-Dyxkqmuf9r.webp"
                            type="image/webp" class="img-fluid"
                            srcset="https://porkgames.com/public/upload/game/thumb-Dyxkqmuf9r.webp">
                        <source data-srcset="https://porkgames.com/public/upload/game/thumb-Dyxkqmuf9r.png"
                            type="image/png" class="img-fluid"
                            srcset="https://porkgames.com/public/upload/game/thumb-Dyxkqmuf9r.png">
                        <img data-src="https://porkgames.com/public/upload/game/thumb-Dyxkqmuf9r.png" alt="Hopper bunny"
                            class="lazyload img-fluid" width="500" height="500">
                    </picture>
                    <div class="card-body">
                        <h3>
                            Hopper bunny </h3>
                    </div>
                </a>
                <a href="https://porkgames.com/play/gameloft-solitaire" class="card ">
                    <picture>
                        <source data-srcset="https://porkgames.com/public/upload/game/thumb-f8DzLZUAOu.webp"
                            type="image/webp" class="img-fluid"
                            srcset="https://porkgames.com/public/upload/game/thumb-f8DzLZUAOu.webp">
                        <source data-srcset="https://porkgames.com/public/upload/game/thumb-f8DzLZUAOu.png"
                            type="image/png" class="img-fluid"
                            srcset="https://porkgames.com/public/upload/game/thumb-f8DzLZUAOu.png">
                        <img data-src="https://porkgames.com/public/upload/game/thumb-f8DzLZUAOu.png"
                            alt="Gameloft Solitaire" class="lazyload img-fluid" width="500" height="500">
                    </picture>
                    <div class="card-body">
                        <h3>
                            Gameloft Solitaire </h3>
                    </div>
                </a>
                <a href="https://porkgames.com/play/survival-456-but-it-impostor" class="card ">
                    <picture>
                        <source data-srcset="https://porkgames.com/public/upload/game/thumb-hxmaPvC3Kp.webp"
                            type="image/webp" class="img-fluid"
                            srcset="https://porkgames.com/public/upload/game/thumb-hxmaPvC3Kp.webp">
                        <source data-srcset="https://porkgames.com/public/upload/game/thumb-hxmaPvC3Kp.png"
                            type="image/png" class="img-fluid"
                            srcset="https://porkgames.com/public/upload/game/thumb-hxmaPvC3Kp.png">
                        <img data-src="https://porkgames.com/public/upload/game/thumb-hxmaPvC3Kp.png"
                            alt="Survival 456 But It Impostor" class="lazyload img-fluid" width="500" height="500">
                    </picture>
                    <div class="card-body">
                        <h3>
                            Survival 456 But It Impostor </h3>
                    </div>
                </a>
                <a href="https://porkgames.com/play/ocean-bubble-shooter" class="card ">
                    <picture>
                        <source data-srcset="https://porkgames.com/public/upload/game/thumb-s3YPPNI6Ti.webp"
                            type="image/webp" class="img-fluid"
                            srcset="https://porkgames.com/public/upload/game/thumb-s3YPPNI6Ti.webp">
                        <source data-srcset="https://porkgames.com/public/upload/game/thumb-s3YPPNI6Ti.png"
                            type="image/png" class="img-fluid"
                            srcset="https://porkgames.com/public/upload/game/thumb-s3YPPNI6Ti.png">
                        <img data-src="https://porkgames.com/public/upload/game/thumb-s3YPPNI6Ti.png"
                            alt="Ocean Bubble Shooter" class="lazyload img-fluid" width="500" height="500">
                    </picture>
                    <div class="card-body">
                        <h3>
                            Ocean Bubble Shooter </h3>
                    </div>
                </a>
                <a href="https://porkgames.com/play/arctic-jump" class="card ">
                    <picture>
                        <source data-srcset="https://porkgames.com/public/upload/game/thumb-xChvtJewqf.webp"
                            type="image/webp" class="img-fluid"
                            srcset="https://porkgames.com/public/upload/game/thumb-xChvtJewqf.webp">
                        <source data-srcset="https://porkgames.com/public/upload/game/thumb-xChvtJewqf.png"
                            type="image/png" class="img-fluid"
                            srcset="https://porkgames.com/public/upload/game/thumb-xChvtJewqf.png">
                        <img data-src="https://porkgames.com/public/upload/game/thumb-xChvtJewqf.png" alt="Arctic jump"
                            class="lazyload img-fluid" width="500" height="500">
                    </picture>
                    <div class="card-body">
                        <h3>
                            Arctic jump </h3>
                    </div>
                </a>
                <a href="https://porkgames.com/play/extreme-drift-car-simulator" class="card ">
                    <picture>
                        <source data-srcset="https://porkgames.com/public/upload/game/thumb-OFsVGPuZlr.webp"
                            type="image/webp" class="img-fluid"
                            srcset="https://porkgames.com/public/upload/game/thumb-OFsVGPuZlr.webp">
                        <source data-srcset="https://porkgames.com/public/upload/game/thumb-OFsVGPuZlr.png"
                            type="image/png" class="img-fluid"
                            srcset="https://porkgames.com/public/upload/game/thumb-OFsVGPuZlr.png">
                        <img data-src="https://porkgames.com/public/upload/game/thumb-OFsVGPuZlr.png"
                            alt="Extreme Drift Car Simulator" class="lazyload img-fluid" width="500" height="500">
                    </picture>
                    <div class="card-body">
                        <h3>
                            Extreme Drift Car Simulator </h3>
                    </div>
                </a>
                <a href="https://porkgames.com/play/color-match-3d" class="card ">
                    <picture>
                        <source data-srcset="https://porkgames.com/public/upload/game/thumb-oLlO2WTnFx.webp"
                            type="image/webp" class="img-fluid"
                            srcset="https://porkgames.com/public/upload/game/thumb-oLlO2WTnFx.webp">
                        <source data-srcset="https://porkgames.com/public/upload/game/thumb-oLlO2WTnFx.png"
                            type="image/png" class="img-fluid"
                            srcset="https://porkgames.com/public/upload/game/thumb-oLlO2WTnFx.png">
                        <img data-src="https://porkgames.com/public/upload/game/thumb-oLlO2WTnFx.png"
                            alt="Color Match 3D" class="lazyload img-fluid" width="500" height="500">
                    </picture>
                    <div class="card-body">
                        <h3>
                            Color Match 3D </h3>
                    </div>
                </a>
                <a href="https://porkgames.com/play/rocket-fest" class="card ">
                    <picture>
                        <source data-srcset="https://porkgames.com/public/upload/game/thumb-bGJDFRec6U.webp"
                            type="image/webp" class="img-fluid"
                            srcset="https://porkgames.com/public/upload/game/thumb-bGJDFRec6U.webp">
                        <source data-srcset="https://porkgames.com/public/upload/game/thumb-bGJDFRec6U.png"
                            type="image/png" class="img-fluid"
                            srcset="https://porkgames.com/public/upload/game/thumb-bGJDFRec6U.png">
                        <img data-src="https://porkgames.com/public/upload/game/thumb-bGJDFRec6U.png" alt="Rocket Fest"
                            class="lazyload img-fluid" width="500" height="500">
                    </picture>
                    <div class="card-body">
                        <h3>
                            Rocket Fest </h3>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <input type="hidden" name="game_id" value="1133">
    </div>
    </div>
    <script defer="" src="https://porkgames.com/app/theme/assets/js/jquery.min.js?v=1.0.0"></script>
    <script defer="" src="https://porkgames.com/app/theme/assets/js/bootstrap.js?v=1.0.0"></script>
    <script defer="" src="https://porkgames.com/app/theme/assets/js/lazysizes.js?v=1.0.0"></script>
    <script defer="" src="https://porkgames.com/app/theme/assets/js/jquery.comment.js?v=1.0.0"></script>
    <script defer="" src="https://porkgames.com/app/theme/assets/js/plugin.js?v=1.0.0"></script>
    <script defer="" src="https://porkgames.com/app/theme/assets/js/main.js?v=1.0.0"></script>
    <div class="footer py-2 mt-auto">
        <div class="container-fluid">
            <div class="row align-items-center no-gutters py-2 fs-14">

                <div class="col-lg-4 col-md-5 col-12">
                    <div class="fs-xs text-muted">Copyright © 2022
                        porkgames.com. All rights reserved.</div>
                </div>

                <div class="col-12 col-md-7 col-lg-8 d-md-flex justify-content-end">
                    <nav class="nav fs-xs text-muted">
                    </nav>
                </div>
            </div>
        </div>
    </div>
    <div class="position-fixed end-0 bottom-0 p-xl-4 p-3 modal-register d-none">
        <div class="position-relative">
            <div class="card shadow-lg bg-white border-0 rounded-lg-pill">
                <div class="card-body text-center px-4 d-flex align-items-center flex-nowrap">
                    <p class="fs-sm text-muted mb-0 me-3">
                        This website uses cookies to ensure you get the best experience on our website <a
                            href="https://porkgames.com/page/cookie" class="text-theme">
                            Learn more</a></p>
                    <button type="button" class="btn-close close-register btn-sm ms-auto shadow-none"
                        data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" id="xl" tabindex="-1" aria-labelledby="modal" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content">
            </div>
        </div>
    </div>
    <div class="modal" id="lg" tabindex="-1" aria-labelledby="modal" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
            </div>
        </div>
    </div>
    <div class="modal" id="m" tabindex="-1" aria-labelledby="modal" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
            </div>
        </div>
    </div>
    <div class="modal" id="sm" tabindex="-1" aria-labelledby="modal" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-sm">
            <div class="modal-content">
            </div>
        </div>
    </div>

    <script>
        // Set the options globally
        // to make LazyLoad self-initialize
        window.lazyLoadOptions = {
            // Your custom settings go here
        };
    </script>
    <style>
        #menu-container {
            width: 380px !important;
            height: initial !important;
        }

        #menu1 {
            width: 250px !important;
        }
    </style>

    <script async defer src="https://cdn.jsdelivr.net/npm/vanilla-lazyload@17.8.1/dist/lazyload.min.js"></script>
    <?php
		$actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
		echo file_get_contents("https://doodlejump.io/navigation.php?host=".$actual_link);?>
</body>

</html>