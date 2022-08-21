using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GunnerShoot : MonoBehaviour
{
    private GameObject _muzzleFlash;

    [SerializeField]
    private GameObject _bulletPrefab;

    void Awake()
    {
        _muzzleFlash = GameObject.Find("MuzzleFlash");

    }
    // Start is called before the first frame update
    void Start()
    {
        ShowMuzzle(false);
    }

    // La méthode est appelée toutes les frames. Par exemple, si notre jeu tourne à 60 frames par seconde (fps)
    // Alors la méthode sera appelée 60 fps par secondes.
    // C'est notamment dans cette fonction que nous pouvons récupérer les entrées utilisateurs comme les touches appuyées
    void Update()
    {
        if (Input.GetKeyDown(KeyCode.Space))
        {
            Shoot();
            StartCoroutine(FlashMuzzle());
        }

        // if (Time.time > next_fire)
        // {
        //     next_fire = Time.time + fire_rate;
        //     fire();
        // }
    }

    void ShowMuzzle(bool show)
    {
        Color tempcolor = _muzzleFlash.GetComponent<Renderer>().material.color;
        tempcolor.a = (show) ? 1 : 0;

        _muzzleFlash.GetComponent<Renderer>().material.color = tempcolor;
    }

    IEnumerator FlashMuzzle()
    {
        ShowMuzzle(true);
        yield return new WaitForSeconds(0.3f);
        ShowMuzzle(false);
    }

    void Shoot()
    {
        var bullet = Instantiate(
            _bulletPrefab, 
            _muzzleFlash.transform.position, 
            Quaternion.identity
        );
        bullet.transform.localScale = transform.localScale;
        bullet.transform.right = transform.right.normalized;
    }
}
