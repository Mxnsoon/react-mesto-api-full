import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
      
        props.onUpdateAvatar({
          avatar: avatarRef.current.value
        });
      } 

    return (
        <PopupWithForm
        title="Обновить аватар"
        name="avatar"
        button="Сохранить"
        isOpen={props.isOpen}
        onSubmit={handleSubmit}
        onClose={props.onClose}>
          <div>
          <input type="url" id="popup__field_avatar" className="popup__field popup__field_avatar" placeholder="Ссылка на картинку" required ref={avatarRef} />
         <span className="popup__field_error popup__field_avatar_error"></span>
          </div>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;