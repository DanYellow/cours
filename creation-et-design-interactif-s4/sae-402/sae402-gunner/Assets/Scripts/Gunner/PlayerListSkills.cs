using System.Collections;
using System.Collections.Generic;

public class PlayerListSkills
{
    public enum SkillType
    {
        Jump,
    }

    public static PlayerListSkills _instance { get; private set; }

    private List<SkillType> listUnlockedSkills = new List<SkillType>();


    public static PlayerListSkills GetInstance()
    {
        if (_instance == null)
        {
            _instance = new PlayerListSkills();
        }
        return _instance;
    }

    public List<SkillType> GetPlayerSkills()
    {
        return new List<SkillType>();
    }

    public void UnlockSkill(SkillType skillType)
    {
        if(!isSkillUnlocked(skillType)) {
            listUnlockedSkills.Add(skillType);
        }
    }

    public bool isSkillUnlocked(SkillType skillType)
    {
        return listUnlockedSkills.Contains(skillType);
    }
}
