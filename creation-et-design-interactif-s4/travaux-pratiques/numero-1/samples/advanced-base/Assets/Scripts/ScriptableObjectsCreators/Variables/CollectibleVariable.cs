using UnityEngine;

[CreateAssetMenu(fileName = "New Collectible Var", menuName = "ScriptableObjects/Variable/CollectibleVariable")]
public class CollectibleVariable : ScriptableObject
{
    public string title;
    public int value;
    public AudioClip audioClip;

    public Sprite sprite;

    public PlaySoundAtEventChannelSO onPickUp;
    public IntEventChannelSO onPickUpValue;

    public void PickItem(Vector3 position) {
        onPickUp.Raise(audioClip, position);
        onPickUpValue.Raise(value);
    }
}