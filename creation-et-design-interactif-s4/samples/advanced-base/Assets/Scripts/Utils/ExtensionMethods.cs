using UnityEngine;
using System.Collections;
using System;

// https://learn.unity.com/tutorial/extension-methods#
public static class ExtensionMethods
{
    public static void SetPlaceholderText(this TextField textField, string placeholder)
    {
        string placeholderClass = TextField.ussClassName + "__placeholder";

        onFocusOut();
        textField.RegisterCallback<FocusInEvent>(evt => onFocusIn());
        textField.RegisterCallback<FocusOutEvent>(evt => onFocusOut());

        void onFocusIn()
        {
            if (textField.ClassListContains(placeholderClass))
            {
                textField.value = string.Empty;
                textField.RemoveFromClassList(placeholderClass);
            }
        }

        void onFocusOut()
        {
            if (string.IsNullOrEmpty(textField.text))
            {
                textField.SetValueWithoutNotify(placeholder);
                textField.AddToClassList(placeholderClass);
            }
        }
    }
}