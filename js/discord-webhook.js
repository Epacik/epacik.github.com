/*jshint esversion:6*/

let webhookURL = 'https://discordapp.com/api/webhooks/426039054765654023/zd-FQPVHtMoaIsPH4xTuuYPCmGYSNPpJBWkKYN40L5FEF9kdJaRx4gUlrFP7P0p_F1PU';

let sendWebhook = () => {
  const embed = {
    author: {
      name: $('#author_name').val(),
      url: '',
      icon_url: '',
    },
    color: parseInt('0E95FB', 16),
    description: $('#text').val(),
    title: $('#contact').val(),
    url: '',
    image: { url: '' },
    thumbnail: { url: '' },
    footer: {
      text: '',
      icon_url: '',
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
        content: '',
        username: '',
        avatar_url: '',
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
