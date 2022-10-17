using System.Collections;
using System.Linq;
using UnityEngine;

public class Player : MonoBehaviour
{
    public Health health;

    public ScriptableObj.Health health1;

    private float currentHealth;

    public SpriteRenderer spriteRenderer;
    float invincibilityFlashDelay = 0.2f;
    float invincibilityTimeAfterHit = 2.5f;
    bool _isInvincible = false;
    public Rigidbody2D rb;

    private int coinsCount;

    public Animator animator;

    public HUD heathInfo;

    public Sound[] playlist;

    private void Start()
    {
        health.onDamage += TakeDamage;
        health.onHeal += Heal;
        health.onDie += Die;
        // heathInfo.SetHealth(health.GetMaxHealth());

        currentHealth = health1.GetHealth();

        Debug.Log(Screen.resolutions);
        Debug.Log(Screen.resolutions, this);
    }

    private void Update() {
        if (Input.GetKeyDown(KeyCode.KeypadPlus))
        {
            health1.Heal(0.5f);
            Debug.Log("hp : " + health1.GetHealth());
        }

        if (Input.GetKeyDown(KeyCode.KeypadMinus))
        {
            health1.TakeDamage(0.5f);
            Debug.Log("hp : " + health1.GetHealth());
        }
    }

    // LoadLevelManager.instance.PlayerDie();

    void TakeDamage()
    {
        if (health.GetHealth() >= 0)
        {
            heathInfo.SetHealth(health.GetHealth());
            _isInvincible = true;
            StartCoroutine(InvincibilityFlash());
            StartCoroutine(HandleInvincibilityDelay());
        }
    }

    void Heal()
    {
        heathInfo.SetHealth(health.GetHealth());
    }

    public void Die()
    {
        // Désactiver le mouvement
        // Lancer l'animation de mort
        // Arrêter le mouvement
        // Supprimer les collisions


        AudioClip deathClip = playlist
            .Where(item => item.name == "death")
            .Select(item => item.clip).First();

        AudioManager.instance.PlayClipAt(deathClip, transform.position);

        StartCoroutine(CameraShake.instance.Shake(0.15f));

        GetComponent<CapsuleCollider2D>().enabled = false;
        PlayerMovement.instance.enabled = false;
        PlayerMovement.instance.rb.bodyType = RigidbodyType2D.Static;
        PlayerMovement.instance.rb.velocity = Vector3.zero;

        animator.SetFloat("VerticalSpeed", 0);
        animator.enabled = false;
        animator.enabled = true;
        animator.SetTrigger("Die");

        // if (CurrentSceneManager.instance.isPlayerHereByDefault)
        // {
        //     DontDestroyOnLoadScene.instance.MoveInMainScene();
        // }
    }

    public IEnumerator InvincibilityFlash()
    {
        while (_isInvincible)
        {
            spriteRenderer.color = new Color(1f, 1f, 1f, 0f);
            yield return new WaitForSeconds(invincibilityFlashDelay);
            spriteRenderer.color = new Color(1f, 1f, 1f, 1f);
            yield return new WaitForSeconds(invincibilityFlashDelay);
        }
    }

    public IEnumerator HandleInvincibilityDelay()
    {
        yield return new WaitForSeconds(invincibilityTimeAfterHit);
        _isInvincible = false;
    }

    public bool IsInvisible()
    {
        return _isInvincible;
    }

    private void OnDestroy()
    {
        health.onDamage -= TakeDamage;
        health.onDie -= Die;
        health.onHeal -= Heal;
    }

    // [ContextMenu("Save")]
    // private void OnApplicationQuit()
    // {
    //     Debug.Log("OnApplicationQuit", this);
    // }

    // void OnApplicationPause(bool pauseStatus)
    // {
    //      Debug.Log("OnApplicationPause", this);
    // }
}

[System.Serializable]
public class Sound
{
    public string name;
    public AudioClip clip;
}