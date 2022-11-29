using UnityEngine;

[CreateAssetMenu(fileName = "New Collectible Var", menuName = "ScriptableObjects/Variable/CollectibleVariable")]
public class CollectibleVariable : ScriptableObject
{
    public string title;
    public int value;
    public AudioClip audioClip;
    public GameObjectEventChannelSO onCollect;
}