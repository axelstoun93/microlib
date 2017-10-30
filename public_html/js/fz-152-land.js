/**
 * Created by ab on 30.06.2017.
 */
function windowsOpenPageFz152()
{
    var page = window.open('/fz152.html','Политика обработки персональных данных');
    page.blur()
}
(function ()
{
    function addcheckbox(href) {
        var allForms = document.forms;
        for (var i = 0; i < allForms.length;i++) {
            if (allForms[i].getElementsByTagName('input').length >= 2) {
                // формируем div блоки
                var divPolicy = document.createElement('div');
                divPolicy.id = 'policy-area';
                // формируем текст в нутри divPolicy
                divPolicy.innerHTML = '<p style="text-align:center;width:100%;font-size:14px;">Нажимая на кнопку, вы даете согласие на обработку своих персональных данных <br><a href="#" onclick="windowsOpenPageFz152()" ><b>условиями политики конфиденциальности</b></a></p><br>';
                var policy = document.createElement('div');
                policy.className = 'policy';
                // создаем checkbox
                var checkBoxPolicy = document.createElement('input');
                checkBoxPolicy.type = 'checkbox';
                checkBoxPolicy.name = 'agreeWithPolicy';
                checkBoxPolicy.id = 'cb-policy';
                checkBoxPolicy.value = "true";
                checkBoxPolicy.checked = 'true';
                // Добовляем  checkBoxPolicy к policy
                var policyText = document.createElement('div');
                policyText.className = 'policy-text';
                var a = beforeInput(allForms[i]);
				
                a.parents.insertBefore(divPolicy, a.input);
                // allForms[i].insertBefore(divPolicy,beforeInput(allForms[i]));
                //policy.appendChild(checkBoxPolicy);
            }
        }



        // Получаем положение перед кнопной отправить
        function beforeInput(parents)
        {
            var array = {};
            var allInput = parents.getElementsByTagName('input');
            
                allInput = parents.getElementsByTagName('button');
                for (i = 0;i < allInput.length;++i)
                {
                    if(allInput[i].type == 'submit')
                    {
                        array.input = allInput[i];
                        array.parents = allInput[i].parentNode;
                    }
                }
                return array;
            
        }
    }
    //addcheckbox();
})();
