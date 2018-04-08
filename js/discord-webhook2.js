/*jshint esversion:6*/
let webhookURL = 'https://discordapp.com/api/webhooks/432657481945317388/V52Ynj72Z4HV16K4wVXtSEdBSTbrw2-pnwY1OVRPnNklrpE15yVKh0DC-7rSDVJlaO6h';

let sendWebhook = function () {
  let disMsg = document.forms.discordWebhook;

  const embed = {

    color: parseInt(disMsg.col.value, 16),
    description: disMsg.desc.value,
    title: disMsg.title.value,
    url: disMsg.url.value,
    image: { url: disMsg.imgUrl.value },
    thumbnail: { url: disMsg.thumbUrl.value },
    footer: {
      text: disMsg.footer.value,
      icon_url: disMsg.footImg.value,
    },
  };
  const props = [];
  for (const val of Object.values(embed)) {
    if (typeof val === 'string')
      props.push(val);
    else
      for (const v of Object.values(val))
        props.push(v);
  }

  //wyślij
  try {
    $.ajax({
      type: 'POST',
      url: webhookURL,
      crossDomain: true,
      data: JSON.stringify({
        content: disMsg.content.value,
        username: disMsg.author.value,
        avatar_url: disMsg.avaratUrl.value,
        embeds: props.some(Boolean) ? [embed] : undefined,
      }),
      success: success => {
        console.log(success);
      },

      error: error => {
        console.log(error);
      },
    });
  } catch (e) {
    console.log('lol');
  }

};
