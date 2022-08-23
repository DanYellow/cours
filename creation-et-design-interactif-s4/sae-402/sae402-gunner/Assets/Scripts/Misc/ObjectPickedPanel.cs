using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class ObjectPickedPanel : MonoBehaviour
{
    private Image _imageContainer;
    private Text _name;
    private Text _description;
    // Start is called before the first frame update
    void Awake()
    {
        _imageContainer = transform.Find("Sprite").GetComponent<Image>();
        _name = transform.Find("Name").GetComponent<Text>();
        _description = transform.Find("Description").GetComponent<Text>();

        enabled = false;
        PowerUp.onPickup += Show;
    }

    void Show(PowerUpData powerUpData)
    {
        enabled = true;
        if (powerUpData.sprite)
        {
            _imageContainer.sprite = powerUpData.sprite;
        }

        _name.text = powerUpData.powerUpName;
        _description.text = powerUpData.description;

        StartCoroutine(Hide());
    }

    IEnumerator Hide()
    {
        yield return new WaitForSeconds(3.0f);
        enabled = false;
    }
}
