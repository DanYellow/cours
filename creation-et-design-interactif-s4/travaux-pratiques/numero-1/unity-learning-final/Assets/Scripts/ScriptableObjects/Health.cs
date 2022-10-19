using UnityEngine;

// https://github.com/roboryantron/Unite2017/blob/master/Assets/Code/Variables/ImageFillSetter.cs
// https://youtu.be/raQ3iHhE_Kk?t=1401

namespace ScriptableObj
{
    [CreateAssetMenu(fileName = "Health", menuName = "Examples/Health")]
    public class Health : ScriptableObject
    {
        [SerializeField]
        private float maxValue = 10;
        [SerializeField]
        private float currentValue;

        [Multiline]
        public string DeveloperDescription = "";


        public delegate void OnDieDelegate();
        public event OnDieDelegate onDie;

        public delegate void OnDamageDelegate();
        public event OnDamageDelegate onDamage;

        public delegate void OnHealDelegate();
        public event OnHealDelegate onHeal;

        private void OnEnable()
        {
            currentValue = maxValue;
        }

        private void OnDisable() {
            // Debug.Log("fffefe");
        }

        public void TakeDamage(float damage)
        {
            currentValue -= damage;
            onDamage?.Invoke();
            if (currentValue <= 0)
            {
                onDie?.Invoke();
            }
        }

        // public float GetHealth() {
        //     return currentValue;
        // }

        public float GetHealth() => currentValue;
        public float GetMaxHealth() => maxValue;

        public void Heal(float health)
        {
            if (currentValue >= maxValue) return;
            currentValue += health;
            onHeal?.Invoke();
        }

        private void OnValidate()
        {
            currentValue = currentValue * 2;
            currentValue = Mathf.Round(currentValue);
            currentValue = currentValue / 2;

            if (currentValue >= maxValue) {
                currentValue = maxValue;
            }
        }
    }
}

