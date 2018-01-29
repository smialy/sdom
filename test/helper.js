
var user = (function(){
    return {
        setup: function(){
            var title = document.createElement('h1');
            document.body.appendChild(title);

            var user = document.createElement('div');
            user.classList.add('user');
            document.body.appendChild(user);

            var name = document.createElement('div');
            name.classList.add('name');
            user.appendChild(name);

            var role = document.createElement('div');
            role.classList.add('role');
            user.appendChild(role);

            document.body.appendChild(user);
            return {
                title: title,
                user:user,
                name:name,
                role:role
            };
        },
        teardown:function(){
            var title = document.body.querySelector('h1');
            if(title){
                document.body.removeChild(title);
            }
            var user = document.body.querySelector('.user');
            if(user){
                document.body.removeChild(user);
            }
        }
    };
})();

export {
    user
};