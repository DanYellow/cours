using UnityEngine;

[CreateAssetMenu(fileName = "PowerUpData", menuName="Gunner/PowerUp data")]
public class PowerUpData : ScriptableObject
{
    public string powerUpName;
    [TextArea]
    public string description;
    public Sprite sprite;
    public PlayerListSkills.SkillType skill;
}
