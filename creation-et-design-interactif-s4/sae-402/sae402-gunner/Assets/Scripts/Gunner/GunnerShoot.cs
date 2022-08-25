using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GunnerShoot : MonoBehaviour
{
    private GameObject _muzzleFlash;

    [SerializeField]
    private GameObject _bulletPrefab;

    [SerializeField]
    private float _shootingRate;
    private float _nextShootTime = 0f;

    public int maxAmmo = 42;

    void Awake()
    {
        _muzzleFlash = GameObject.Find("MuzzleFlash");
    }

    // Start is called before the first frame update
    void Start()
    {
        _shootingRate = 0.3f;
        ShowMuzzle(false);
    }

    // La méthode est appelée toutes les frames. Par exemple, si notre jeu tourne à 60 frames par seconde (fps)
    // Alors la méthode sera appelée 60 fps par secondes.
    // C'est notamment dans cette fonction que nous pouvons récupérer les entrées utilisateurs comme les touches appuyées
    void Update()
    {
        if (Time.time >= _nextShootTime)
        {
            if (Input.GetKeyDown(KeyCode.Space))
            {
                _nextShootTime = Time.time + _shootingRate;
                Shoot();
                StartCoroutine(FlashMuzzle());
            }
        }
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
        yield return new WaitForSeconds(_shootingRate);
        ShowMuzzle(false);
    }

    void Shoot()
    {
        maxAmmo--;
        GameObject bullet = Instantiate(
            _bulletPrefab,
            _muzzleFlash.transform.position,
            Quaternion.identity
        );
        bullet.transform.localScale = transform.localScale;

        // Nous permet d'orienter le projectile toujours dans le sens du tireur
        bullet.transform.right = transform.right.normalized;
    }
}
