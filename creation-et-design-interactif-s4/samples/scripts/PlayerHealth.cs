using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerHealth : MonoBehaviour
{
    public bool isInvulnerable = false;

    public SpriteRenderer sr;
    public float invulnerableDuration = 3;
    public float invulnerableDelta = 0.15f;

    public PlayerData playerData;

    public VoidEventChannel onPlayerDeath;

    private void Start()
    {
        playerData.currentLifePoints = playerData.maxLifePoints;
    }

    public void Hurt(int damage)
    {
        if (isInvulnerable)
        {
            return;
        }

        playerData.currentLifePoints = playerData.currentLifePoints - damage;

        if (playerData.currentLifePoints <= 0)
        {
            Die();
        }
        else
        {
            StartCoroutine(Invulnerable());
        }
    }

    private void Die()
    {
        onPlayerDeath?.Raise();
        transform.Rotate(0, 0, 45f);
        sr.color = Color.red;
        foreach (Transform child in transform)
        {
            SpriteRenderer childSr = child.GetComponent<SpriteRenderer>();
            if (childSr != null)
            {
                childSr.color = Color.red;
            }
        }
    }

    public IEnumerator Invulnerable()
    {
        isInvulnerable = true;

        WaitForSeconds invulnerableDeltaWait = new WaitForSeconds(invulnerableDelta);

        for (float i = 0; i <= invulnerableDuration; i += invulnerableDelta)
        {
            if (sr.color.a == 1)
            {
                sr.color = new Color(1f, 1f, 1f, 0f); // Color.clear
            }
            else
            {
                sr.color = Color.white;
            }

            yield return invulnerableDeltaWait;
        }

        sr.color = Color.white;
        isInvulnerable = false;
    }
}
