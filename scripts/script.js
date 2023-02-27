const countryButton = document.getElementById('country-select')
const modal = document.getElementById('modal')
const phoneElement = document.getElementById('phone-code')
const inputPhoneElement = document.getElementById('phone')
const flagElement = document.getElementById('country-flag')

readTextFile('/assets/countries.json').then((res) => {
    const countries = JSON.parse(res)
    countries.forEach(country => {
        createCountry(country.number, country.name, country.flag)
    });
})

inputPhoneElement.addEventListener('input', (e) => {
    inputPhoneElement.value = e.target.value.slice(0, 12)
})

inputPhoneElement.addEventListener('focus', _ => {
    if(!/^\+\d*$/.test(inputPhoneElement.value))
    inputPhoneElement.value = '';
});

inputPhoneElement.addEventListener('keypress', e => {
  if(!/\d/.test(e.key))
    e.preventDefault();
});

countryButton.addEventListener('click', (e) => {
    modal.classList.toggle('country-select__modal-open')
})

function createCountry(code, name, flagURL) {
    const country = document.createElement('div')
    country.classList.add('country-select__modal-item')
    country.innerHTML = `
    <div class="country-select__modal-item__name">
        ${name}
    </div>
    <div class="country-select__modal-item__phone">
        <div class="country-select__modal-item__phone-number">${code}</div>
        <img src="${flagURL}">
    </div>
    `
    modal.appendChild(country)
    country.addEventListener('click', (e) => {
        modal.classList.toggle('country-select__modal-open')
        phoneElement.innerText = code;
        flagElement.setAttribute('src', flagURL)
    })
}

function readTextFile(file)
{
    return new Promise((res, rej) => {
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = function ()
        {
            if(rawFile.readyState === 4)
            {
                if(rawFile.status === 200 || rawFile.status == 0)
                {
                    res(rawFile.responseText);
                }
            }
        }
        rawFile.send(null);
    })
}

const th = document.getElementById("switchMode");
const darkmode = localStorage.getItem('theme');
const theme = document.getElementById("theme");

if (darkmode) {
    theme.href = darkmode === 'dark' ? "/styles/dark-mode-styles.css" : '/styles/light-mode-styles.css';
}

const changeTheme = () => { 
  let theme = document.getElementById("theme");
  const themeState = localStorage.getItem('theme');
  console.log(themeState);
  if (themeState === 'light') {
    theme.href = "/styles/dark-mode-styles.css";
    localStorage.setItem('theme', 'dark');
  } else {
    theme.href = "/styles/light-mode-styles.css";
    localStorage.setItem('theme', 'light');
  }
}

th.addEventListener('click', changeTheme);

// "use strict"

// document.addEventListener('DOMContentLoaded', function () {
//     const form = document.getElementById('form');
//     form.addEventListener('submit', formSend);

    // async function formSend(e){
    //     e.preventDefault();

    //     let error = formValidate(form);

    //     let formData = new FormData(form);

    //     if (!error) {
    //         form.classList.add('_sending');
    //         let response = await fetch('sendmail.php', {
    //             method: 'POST',
    //             body: formData
    //         });
    //         if (response.ok) {
    //             let result = await response.json();
    //             alert(result.message);
    //             formPreview.innerHTML = '';
    //             form.reset();
    //             form.classList.remove('_sending');
    //         }else{
    //             alert("Ошибка");
    //             //удалить класс сендинг
    //         }
    //     }else{
    //         alert('Заполните обязательные поля!');
    //     }
    // }
    

//     async function formSend(e) {
//         e.preventDefault();
    
//         let error = formValidate(form);
    
//         let formData = new FormData(form);
//         if (error === 0) {
//             form.classList.add('_sending');
//             try {
//                 let response = await fetch('index.php', {
//                     method: 'POST',
//                     body: formData
//                 });
//                 if (response.ok) {
//                     let result = await response.json();
//                     alert(result.message);
//                     form.reset();
//                     form.classList.remove('_sending');
//                 } else {
//                     alert("Error");
//                     form.classList.remove('_sending');
//                 }
//             } catch (error) {
//                 console.error(error);
//                 alert("Errorjs");
//                 form.classList.remove('_sending');
//             }
//         }
//     }
    

//     function formValidate(form){
//         let error = 0;
//         let formReq = document.querySelectorAll('._req');

//         for (let i = 0; i < formReq.length; i++) {
//             const input = formReq[i];
//             formRemoveError(input);

//             if ((input.value.trim() === '') || (input.value == '')) {
//                 formAddError(input);
//                 error++; 
//             }else if (input.classList.contains('_email')) {
//                 if (emailTest(input)){
//                     formAddError(input);
//                     error++;
//                 }
//             }
//         }
//         return error;
//     }

//     function formAddError(input) {
//         input.parentElement.classList.add('_error');
//         input.classList.add('_error');
//     }
//     function formRemoveError(input) {
//         input.parentElement.classList.remove('_error');
//         input.classList.remove('_error');
//     }
//     function emailTest(input) {
//         return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
//     }
// });

window.onload = function () {
  // проверяем поддерживает ли браузер FormData
  if (!window.FormData) {
    alert("Браузер не поддерживает загрузку файлов на этом сайте");
  }
}


$(document).ready(function () {

  // Валидация и отправка формы
  var errorTxt = 'Ошибка отправки';
	
  $("#sendform").validate({
    rules: {
      name: {
        required: true,
      },
      phone: {
        required: true,
      },
      mail: {
        required: true,
        email: true
      }
    },
    messages: {
      name: {
        required: "Это поле обязательно для заполнения",
      },
      phone: {
        required: "Это поле обязательно для заполнения",
      },
      mail: {
        required: "Это поле обязательно для заполнения",
        email: "Введите валидный почтовый адресс"
      },
    },
    submitHandler: function (form) {
      var myform = document.forms.sendform,
        formData = new FormData(myform),
        xhr = new XMLHttpRequest();

      xhr.open("POST", "/mail.php");

      xhr.onreadystatechange = function () {
		  if (xhr.readyState == 3) {
			 $("#sendform").html('<p class="thank text-center">Идет отправка формы ...<br></p> ');
		  }         
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            $("#sendform").html('<p class="thank text-center">Данные отправлены!<Br> Вы получите ответ в ближайшее время<Br></p> ');
    }
          if (xhr.status == 500) {
            $("#sendform").html('<p class="thank text-center">Внутренняя ошибка сервера!<p>');
            console.dir(xhr)
          }
        }
      };

      xhr.send(formData);
      console.dir(xhr)
    }
  }); // end $("#sendform")

}); // end $(document).ready



