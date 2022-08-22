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


        //  RaycastHit2D hit;
        // if (Physics2D.Raycast(transform.position, transform.right, out hit, 10))
        // {
        //     Debug.DrawRay(transform.position, transform.right * 10, Color.red);

        // }
    }

    void FixedUpdate()
    {
         RaycastHit2D hit = Physics2D.Raycast(transform.position, transform.right);

          if (hit.collider != null) {

            Debug.Log(hit.collider.name);
         Debug.DrawRay(transform.position, transform.right * 10, Color.red);

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
        yield return new WaitForSeconds(0.3f);
        ShowMuzzle(false);
    }

    void Shoot()
    {
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
