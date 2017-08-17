function songDecoder(song) {
    var songDD = song.replace(/(WUB)+/g, " ");
    return songDD.trim();
}

function songDecoder(song) {
    return song.split('WUB').filter(Boolean).join(' ');
}