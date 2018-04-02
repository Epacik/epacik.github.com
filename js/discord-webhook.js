/*jshint esversion:6*/

let webhookURL = 'https://discordapp.com/api/webhooks/427579628547342336/hhTXGxRGkOsXHg6cmUaMAxMS68u_rNC-0jI1T_dXyTgjxnvxONDbuHAuq0dOwLue6o2R';

let fillIt = 'Can\'t be empty';

document.forms.disMsg.author.addEventListener('focus', function () {
  document.forms.disMsg.author.classList.remove('wrongInput');
  document.querySelector('#formAuthorTxt').innerHTML = `Author`;
});

document.forms.disMsg.email.addEventListener('focus', function () {
  document.forms.disMsg.email.classList.remove('wrongInput');
  document.querySelector('#formEmailTxt').innerHTML = `E-Mail`;
});

document.forms.disMsg.message.addEventListener('focus', function () {
  document.forms.disMsg.message.classList.remove('wrongInput');
  document.querySelector('#formMessageTxt').innerHTML = `Message`;
});

let checkDisMsgForm = function (disMsg) {
  let ret = true;
  if (disMsg.author.value == '') {
    disMsg.author.classList.add('wrongInput');
    document.querySelector('#formAuthorTxt').innerHTML = `Author
      <p class="formErrorMsg">${fillIt}</p>`;
    ret = false;
  }

  if (disMsg.message.value == '') {
    disMsg.message.classList.add('wrongInput');
    document.querySelector('#formMessageTxt').innerHTML = `Message
      <p class="formErrorMsg">${fillIt}</p>`;
    ret = false;
  }

  if (disMsg.email.value == '') {
    disMsg.email.classList.add('wrongInput');
    document.querySelector('#formEmailTxt').innerHTML = `E-Mail
      <p class="formErrorMsg">${fillIt}</p>`;
    ret = false;
  } else {
    if (!validateEmail(disMsg.email.value)) {
      disMsg.email.classList.add('wrongInput');
      document.querySelector('#formEmailTxt').innerHTML = `E-Mail
        <p class="formErrorMsg">Invalid E-Mail</p>`;
    }
  }

  return ret;
};

function validateEmail(sEmail) {
  var reEmail = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;

  if (!sEmail.match(reEmail)) {
    return false;
  }

  return true;

}

let sendWebhook = function () {
  let disMsg = document.forms.disMsg;

  if (!checkDisMsgForm(disMsg)) {
    return;
  }

  const embed = {

    color: parseInt('0E95FB', 16),
    description: disMsg.message.value,
    title: disMsg.email.value,
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
        username: disMsg.author.value,
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

  disMsg.reset();
  alert('Message was sent');
};
