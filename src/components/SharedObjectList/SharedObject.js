import React from "react";

export default function SharedObject(props) {
  return (
    <>
      {/* <div className="input_object" id="item_1">
        <div class="input_object_field input_object_name">
          <input placeholder="Объект 0" value={props.name} />
        </div>
        <div className="input_object_field input_object_is_dividable input_object_is_dividable_true">
          делимый
        </div>
        <div class="input_object_field input_object_delete 123">
          <i class="fas fa-times" aria-hidden="true"></i>
        </div>
      </div> */}
      {/* devider */}
      <div className="shared-object__wrapper">
        <div class="shared-object__input">
          <input placeholder="Объект 0" value={props.name} />
        </div>
        <div className="shared-object__devidable">делимый</div>
        <button class="shared-object__delete-btn">
          <i class="fas fa-times" aria-hidden="true"></i>
        </button>
      </div>
    </>
  );
}
