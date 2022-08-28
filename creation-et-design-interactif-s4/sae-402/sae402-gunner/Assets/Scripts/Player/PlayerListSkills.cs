using System.Collections.Generic;

public class PlayerListSkills
{
    public enum SkillType
    {
        Jump,
        Dash,
        Debug
    }

    public static PlayerListSkills _instance { get; private set; }

    private List<SkillType> listUnlockedSkills =  new List<SkillType>{SkillType.Dash};


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
        if(!IsSkillUnlocked(skillType)) {
            listUnlockedSkills.Add(skillType);
        }
    }

    public bool IsSkillUnlocked(SkillType skillType)
    {
        return listUnlockedSkills.Contains(skillType);
    }
}
