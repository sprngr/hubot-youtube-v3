// Description
//   A hubot script for searching YouTube with the YouTube Data API v3.
//   Based off the original hubot-youtube script.
//
// Configuration:
//   HUBOT_GOOGLE_API - Your Google API key with access enabled for YouTube Data
//                      API v3
//
// Commands:
//   hubot youtube me <query> - Searches YouTube for the query and returns the video embed link.
//
// Notes:
//   Make sure you don't go over your daily quota for API usage.
//
// Author:
//   sprngr

'use strict';

module.exports = (robot) => {
    if (process.env.HUBOT_GOOGLE_API == null) {
        robot.logger.warning('The HUBOT_GOOGLE_API environment variable not set');
        return;
    }

    let ytApiKey = process.env.HUBOT_GOOGLE_API;

    robot.respond(/(?:youtube|yt)(?: me)?\s(.*)/i, (msg) => {
        let query, searchParams, ytSearchUrl;
        query = msg.match[1];
        ytSearchUrl = 'https://www.googleapis.com/youtube/v3/search';
        searchParams = {
            order: 'relevance',
            part: 'snippet',
            maxResults: 1,
            type: 'video',
            key: ytApiKey,
            q: query
        };

        robot.http(ytSearchUrl).query(searchParams).get()((err, res, body) => {
            let videoId;
            let videos = JSON.parse(body).items;

            if (videos === undefined || videos.length === 0) {
                msg.send(`No video results for "${query}"`);
                return;
            }

            videoId = videos[0].id.videoId;

            return msg.send(`http://www.youtube.com/watch?v=${videoId}`);
        });
    });
};
